import React, { useState, useEffect, useContext } from "react";
import { format } from 'date-fns';
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
// import FormPayroll from "../components/forms/FormPayroll";
import { Contexto } from "../context/Contexto";
import { alertConfirm, alertError } from "../components/alerts/alerts";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF2 from "../components/PDF2";

const columns = [
  { label: "CI", accessor: "ci" },
  { label: "Empleado", accessor: "employee_name" },
  { label: "Periodo", accessor: "period" },
  { label: "Fecha Inicio", accessor: "start_date" },
  { label: "Fecha Fin", accessor: "end_date" },
  { label: "Fecha de Pago", accessor: "payment_date" },
  { label: "Salario Base", accessor: "base_salary" },
  { label: "Horas Extras", accessor: "overtime_hours" },
  // { label: "Deducciones", accessor: "deductions" },
  // { label: "Percepciones", accessor: "perceptions" },
  { label: "Salario Bruto", accessor: "gross_salary" },
  { label: "Salario Neto", accessor: "net_salary" },
  { label: "Estado", accessor: "state" },
];

const ITEMS_PER_PAGE = 10;

export default function History() {
  const {
    payrollsData,
    setPayrollsData,
    setEmployeesData,
    peticionGet,
    peticionDelete,
    employeesData,
    company,
    perceptionsData,
    deductionsData
  } = useContext(Contexto);

  const [payrolls, setPayrolls] = useState([]);
  const [filteredPayrolls, setFilteredPayrolls] = useState([]);
  const [originalPayrollsData, setOriginalPayrollsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState(null);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await peticionGet("http://localhost:3000/api/payrolls/", "GET");
      setPayrollsData(response);
      setOriginalPayrollsData(response); // Save original data
      setFilteredPayrolls(response);

      const employeeResponse = await peticionGet("http://localhost:3000/api/employees/all", "GET");
      setEmployeesData(employeeResponse);
    };


    fetchData();
  }, []);

  const mapData = () => {
    if (payrollsData.length > 0) {
      const mappedData = payrollsData?.map((payroll) => {
        const employee = employeesData.find(emp => emp._id === payroll.employee_id);
        return {
          ...payroll,
          employee_name: employee ? `${employee.name} ${employee.surnames}` : "Desconocido",
          ci: employee ? employee.ci : "Desconocido",
          start_date: payroll.start_date.split("T00:00:00.000Z").join(''),
          end_date: payroll.end_date.split("T00:00:00.000Z").join(''),
          payment_date: payroll.payment_date.split("T00:00:00.000Z").join('')
        };
      });
      setFilteredPayrolls(mappedData);
      setOriginalPayrollsData(mappedData);
    }

  };

  useEffect(() => {
    mapData();
  }, [payrollsData]);

  const handleSearch = (query) => {
    if (query === null || query.trim() === "") {
      setFilteredPayrolls(originalPayrollsData);
    } else {
      const filtered = originalPayrollsData.filter((payroll) =>
        payroll.employee_name.toLowerCase().includes(query.toLowerCase()) ||
        payroll.period.toLowerCase().includes(query.toLowerCase()) ||
        payroll.state.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPayrolls(filtered);
    }
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredPayrolls(originalPayrollsData);
    setCurrentPage(1);
  };

  const handleDownloadPDF = (payroll) => {
    setSelectedPayroll(payroll);
  };


  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredPayrolls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayrolls.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setCurrentPayroll(null);
    setIsModalOpen(true);
  };

  const openEditModal = (payroll) => {
    setCurrentPayroll(payroll);
    setIsModalOpen(true);
  };

  const openDeleteModal = (payroll) => {
    setCurrentPayroll(payroll);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setPayrolls(payrolls.filter((pay) => pay._id !== currentPayroll._id));
    setFilteredPayrolls(filteredPayrolls.filter((pay) => pay._id !== currentPayroll._id));
    const response = await peticionDelete(`http://localhost:3000/api/payrolls/${currentPayroll._id}`, "DELETE");
    if (response.message) {
      alertConfirm(response.message);
    } else {
      alertError(response.error);
    }
    closeDeleteModal();
  };

  const handleAddEditPayroll = (payrollData) => {
    const fetchData = async () => {
      const response = await peticionGet("http://localhost:3000/api/payrolls/", "GET");
      setPayrollsData(response);
      setOriginalPayrollsData(response);
      setFilteredPayrolls(response);
      mapData();
    };

    fetchData();
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Nóminas
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SearchBar
          placeholder="Buscar nóminas..."
          onSearch={handleSearch}
          onReset={handleReset} // Pass reset function
        />
        {selectedPayroll && (
          <PDFDownloadLink
            document={<PDF2 data={selectedPayroll} empleados={employeesData} company={company} perceptionsData={perceptionsData} deductionsData={deductionsData} />}
            fileName="nomina.pdf"
          >
            {({ loading }) => (
              <button
                className={`px-2 py-3 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-principalAzulTono5 hover:bg-principalAzulTono3 focus:ring-blue-500'
                  }`}
                disabled={loading}
              >
                {loading ? 'Generando...' : 'Descargar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        )}
      </div>
      {filteredPayrolls.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay nóminas registradas...
        </h3>
      ) : (
        <>
          <Table
            columns={columns}
            data={currentItems}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onDownloadPDF={handleDownloadPDF}
            pdf={true}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {/* <AddButton openModal={openAddModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentPayroll ? "Editar nómina" : "Agregar Nómina"}
      >
        <FormPayroll
          payroll={currentPayroll}
          onSubmit={handleAddEditPayroll}
          onClose={closeModal}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        article="la"
        entityName="nómina"
      /> */}
    </div>
  );
};