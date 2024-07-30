import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contexto } from '../../context/Contexto'; // Asegúrate de ajustar la ruta al archivo de contexto
import { alertBasic, alertError, alertInfo } from '../alerts/alerts';
import paths from '../../config/routePaths';

const countries = [
  { code: 'AF', name: 'Afganistán' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Argelia' },
  { code: 'AS', name: 'Samoa Americana' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguila' },
  { code: 'AQ', name: 'Antártida' },
  { code: 'AG', name: 'Antigua y Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaiyán' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Baréin' },
  { code: 'BD', name: 'Bangladés' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Bielorrusia' },
  { code: 'BE', name: 'Bélgica' },
  { code: 'BZ', name: 'Belice' },
  { code: 'BJ', name: 'Benín' },
  { code: 'BM', name: 'Bermudas' },
  { code: 'BT', name: 'Bután' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia y Herzegovina' },
  { code: 'BW', name: 'Botsuana' },
  { code: 'BR', name: 'Brasil' },
  { code: 'BN', name: 'Brunéi' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Camboya' },
  { code: 'CM', name: 'Camerún' },
  { code: 'CA', name: 'Canadá' },
  { code: 'CF', name: 'República Centroafricana' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoras' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo (Rep. Dem.)' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: 'Costa de Marfil' },
  { code: 'HR', name: 'Croacia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Chipre' },
  { code: 'CZ', name: 'República Checa' },
  { code: 'DK', name: 'Dinamarca' },
  { code: 'DJ', name: 'Yibuti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egipto' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Guinea Ecuatorial' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Esuatini' },
  { code: 'ET', name: 'Etiopía' },
  { code: 'FJ', name: 'Fiyi' },
  { code: 'FI', name: 'Finlandia' },
  { code: 'FR', name: 'Francia' },
  { code: 'GA', name: 'Gabón' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Alemania' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Grecia' },
  { code: 'GD', name: 'Granada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bisáu' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haití' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungría' },
  { code: 'IS', name: 'Islandia' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Irán' },
  { code: 'IQ', name: 'Irak' },
  { code: 'IE', name: 'Irlanda' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italia' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japón' },
  { code: 'JO', name: 'Jordania' },
  { code: 'KZ', name: 'Kazajistán' },
  { code: 'KE', name: 'Kenia' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'Corea del Norte' },
  { code: 'KR', name: 'Corea del Sur' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kirguistán' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Letonia' },
  { code: 'LB', name: 'Líbano' },
  { code: 'LS', name: 'Lesoto' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libia' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lituania' },
  { code: 'LU', name: 'Luxemburgo' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malaui' },
  { code: 'MY', name: 'Malasia' },
  { code: 'MV', name: 'Maldivas' },
  { code: 'ML', name: 'Malí' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Islas Marshall' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauricio' },
  { code: 'MX', name: 'México' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldavia' },
  { code: 'MC', name: 'Mónaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Marruecos' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Birmania' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Países Bajos' },
  { code: 'NZ', name: 'Nueva Zelanda' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Níger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'MK', name: 'Macedonia del Norte' },
  { code: 'NO', name: 'Noruega' },
  { code: 'OM', name: 'Omán' },
  { code: 'PK', name: 'Pakistán' },
  { code: 'PW', name: 'Palaos' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PG', name: 'Papúa Nueva Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PH', name: 'Filipinas' },
  { code: 'PL', name: 'Polonia' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Catar' },
  { code: 'RO', name: 'Rumania' },
  { code: 'RU', name: 'Rusia' },
  { code: 'RW', name: 'Ruanda' },
  { code: 'KN', name: 'San Cristóbal y Nieves' },
  { code: 'LC', name: 'Santa Lucía' },
  { code: 'VC', name: 'San Vicente y las Granadinas' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Santo Tomé y Príncipe' },
  { code: 'SA', name: 'Arabia Saudita' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leona' },
  { code: 'SG', name: 'Singapur' },
  { code: 'SK', name: 'Eslovaquia' },
  { code: 'SI', name: 'Eslovenia' },
  { code: 'SB', name: 'Islas Salomón' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'Sudáfrica' },
  { code: 'SS', name: 'Sudán del Sur' },
  { code: 'ES', name: 'España' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudán' },
  { code: 'SR', name: 'Surinam' },
  { code: 'SE', name: 'Suecia' },
  { code: 'CH', name: 'Suiza' },
  { code: 'SY', name: 'Siria' },
  { code: 'TW', name: 'Taiwán' },
  { code: 'TJ', name: 'Tayikistán' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Tailandia' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad y Tobago' },
  { code: 'TN', name: 'Túnez' },
  { code: 'TR', name: 'Turquía' },
  { code: 'TM', name: 'Turkmenistán' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ucrania' },
  { code: 'AE', name: 'Emiratos Árabes Unidos' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistán' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabue' },
];

const currencies = [
  { code: 'AFN', name: 'Afgani' },
  { code: 'MGA', name: 'Ariary malgache' },
  { code: 'THB', name: 'Baht' },
  { code: 'PAB', name: 'Balboa' },
  { code: 'ETB', name: 'Birr etíope' },
  { code: 'VES', name: 'Bolívar' },
  { code: 'BOB', name: 'Boliviano' },
  { code: 'GHS', name: 'Cedi ghanés' },
  { code: 'UGX', name: 'Chelín ugandés' },
  { code: 'KES', name: 'Chelín keniata' },
  { code: 'SOS', name: 'Chelín somalí' },
  { code: 'TZS', name: 'Chelín tanzano' },
  { code: 'CRC', name: 'Colón costarricense' },
  { code: 'NIO', name: 'Córdoba' },
  { code: 'DKK', name: 'Corona danesa' },
  { code: 'ISK', name: 'Corona islandesa' },
  { code: 'NOK', name: 'Corona noruega' },
  { code: 'SEK', name: 'Corona sueca' },
  { code: 'CZK', name: 'Corona checa' },
  { code: 'FOK', name: 'Corona feroesa' },
  { code: 'GMD', name: 'Dalasi' },
  { code: 'MKD', name: 'Denar' },
  { code: 'STN', name: 'Dobra' },
  { code: 'VND', name: 'Dong' },
  { code: 'AMD', name: 'Dram armenio' },
  { code: 'AED', name: 'Dirham de los Emiratos Árabes Unidos' },
  { code: 'MAD', name: 'Dírham marroquí' },
  { code: 'AUD', name: 'Dólar australiano' },
  { code: 'BSD', name: 'Dólar bahameño' },
  { code: 'BBD', name: 'Dólar de Barbados' },
  { code: 'BZD', name: 'Dólar de Belice' },
  { code: 'BMD', name: 'Dólar de Bermudas' },
  { code: 'BND', name: 'Dólar de Brunéi' },
  { code: 'SGD', name: 'Dólar de Singapur' },
  { code: 'XCD', name: 'Dólar del Caribe Oriental' },
  { code: 'USD', name: 'Dólar estadounidense' },
  { code: 'FJD', name: 'Dólar fiyiano' },
  { code: 'GYD', name: 'Dólar guyanés' },
  { code: 'HKD', name: 'Dólar de Hong Kong' },
  { code: 'KYD', name: 'Dólar de las Islas Caimán' },
  { code: 'SBD', name: 'Dólar de las Islas Salomón' },
  { code: 'JMD', name: 'Dólar jamaiquino' },
  { code: 'CAD', name: 'Dólar canadiense' },
  { code: 'KID', name: 'Dólar kiribatiano' },
  { code: 'LRD', name: 'Dólar liberiano' },
  { code: 'NAD', name: 'Dólar namibio' },
  { code: 'NZD', name: 'Dólar neozelandés' },
  { code: 'SRD', name: 'Dólar surinamés' },
  { code: 'TTD', name: 'Dólar de Trinidad y Tobago' },
  { code: 'TVD', name: 'Dólar tuvaluano' },
  { code: 'ZWL', name: 'Dólar zimbabuense' },
  { code: 'EUR', name: 'Euro' },
  { code: 'HTG', name: 'Gourde' },
  { code: 'UAH', name: 'Grivna' },
  { code: 'PYG', name: 'Guaraní' },
  { code: 'HUF', name: 'Forinto' },
  { code: 'BIF', name: 'Franco burundés' },
  { code: 'XAF', name: 'Franco CFA BEAC' },
  { code: 'XOF', name: 'Franco CFA BCEAO' },
  { code: 'XPF', name: 'Franco CFP' },
  { code: 'KMF', name: 'Franco comorense' },
  { code: 'CDF', name: 'Franco congoleño' },
  { code: 'GNF', name: 'Franco guineano' },
  { code: 'RWF', name: 'Franco ruandés' },
  { code: 'CHF', name: 'Franco suizo' },
  { code: 'DJF', name: 'Franco yibutiano' },
  { code: 'JPY', name: 'Yen' },
  { code: 'PGK', name: 'Kina' },
  { code: 'LAK', name: 'Kip' },
  { code: 'HRK', name: 'Kuna' },
  { code: 'AOA', name: 'Kwanza' },
  { code: 'MWK', name: 'Kwacha malauí' },
  { code: 'ZMW', name: 'Kwacha zambiano' },
  { code: 'MMK', name: 'Kyat' },
  { code: 'GEL', name: 'Lari' },
  { code: 'ALL', name: 'Lek' },
  { code: 'HNL', name: 'Lempira' },
  { code: 'SLL', name: 'Leone' },
  { code: 'MDL', name: 'Leu moldavo' },
  { code: 'RON', name: 'Leu rumano' },
  { code: 'BGN', name: 'Lev búlgaro' },
  { code: 'SHP', name: 'Libra de Santa Elena' },
  { code: 'GIP', name: 'Libra de Gibraltar' },
  { code: 'FKP', name: 'Libra malvinense' },
  { code: 'EGP', name: 'Libra egipcia' },
  { code: 'GBP', name: 'Libra esterlina' },
  { code: 'LBP', name: 'Libra libanesa' },
  { code: 'SYP', name: 'Libra siria' },
  { code: 'SDG', name: 'Libra sudanesa' },
  { code: 'SSP', name: 'Libra sursudanesa' },
  { code: 'GGP', name: 'Libra de Guernsey' },
  { code: 'IMP', name: 'Libra de la Isla de Man' },
  { code: 'JEP', name: 'Libra de Jersey' },
  { code: 'SZL', name: 'Lilangeni' },
  { code: 'TRY', name: 'Lira turca' },
  { code: 'LSL', name: 'Loti' },
  { code: 'AZN', name: 'Manat azerí' },
  { code: 'TMT', name: 'Manat turcomano' },
  { code: 'BAM', name: 'Marco convertible' },
  { code: 'MZN', name: 'Metical' },
  { code: 'NGN', name: 'Naira' },
  { code: 'ERN', name: 'Nakfa' },
  { code: 'BTN', name: 'Ngultrum' },
  { code: 'TWD', name: 'Nuevo dólar taiwanés' },
  { code: 'ILS', name: 'Nuevo shéquel israelí' },
  { code: 'MRU', name: 'Ouguiya' },
  { code: 'TOP', name: 'Paʻanga' },
  { code: 'MOP', name: 'Pataca' },
  { code: 'ARS', name: 'Peso argentino' },
  { code: 'CLP', name: 'Peso chileno' },
  { code: 'COP', name: 'Peso colombiano' },
  { code: 'CUP', name: 'Peso cubano' },
  { code: 'DOP', name: 'Peso dominicano' },
  { code: 'PHP', name: 'Peso filipino' },
  { code: 'MXN', name: 'Peso mexicano' },
  { code: 'UYU', name: 'Peso uruguayo' },
  { code: 'BWP', name: 'Pula' },
  { code: 'GTQ', name: 'Quetzal' },
  { code: 'ZAR', name: 'Rand' },
  { code: 'BRL', name: 'Real brasileño' },
  { code: 'IRR', name: 'Rial iraní' },
  { code: 'OMR', name: 'Rial omaní' },
  { code: 'YER', name: 'Rial yemení' },
  { code: 'KHR', name: 'Riel' },
  { code: 'QAR', name: 'Rial catarí' },
  { code: 'SAR', name: 'Riyal saudí' },
  { code: 'MVR', name: 'Rufiyaa' },
  { code: 'IDR', name: 'Rupia indonesia' },
  { code: 'INR', name: 'Rupia india' },
  { code: 'MUR', name: 'Rupia mauricia' },
  { code: 'NPR', name: 'Rupia nepalí' },
  { code: 'PKR', name: 'Rupia pakistaní' },
  { code: 'LKR', name: 'Rupia de Sri Lanka' },
  { code: 'SCR', name: 'Rupia seychellense' },
  { code: 'RUB', name: 'Rublo ruso' },
  { code: 'BYN', name: 'Rublo bielorruso' },
  { code: 'KGS', name: 'Som' },
  { code: 'UZS', name: 'Som uzbeko' },
  { code: 'TJS', name: 'Somoni' },
  { code: 'PEN', name: 'Sol' },
  { code: 'KRW', name: 'Won surcoreano' },
  { code: 'BDT', name: 'Taka' },
  { code: 'WST', name: 'Tala' },
  { code: 'KZT', name: 'Tenge' },
  { code: 'MNT', name: 'Tugrik' },
  { code: 'VUV', name: 'Vatu' },
  { code: 'KPW', name: 'Won norcoreano' },
  { code: 'CNY', name: 'Yuan' },
  { code: 'PLN', name: 'Złoty' }
];

export default function FormCompanyRegister({ isEditMode }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    currency: '',
    foundationDate: '',
    logo: null
  });
  const [fileName, setFileName] = useState('');
  const { peticionPost, peticionGet, token } = useContext(Contexto);
  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID de la empresa en modo de edición

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && id) {
        try {
          const data = await peticionGet(`http://localhost:3000/api/company/${id}`, 'GET');
          setFormData({
            name: data.name,
            address: data.address,
            country: data.country,
            currency: data.currency,
            foundationDate: data.foundation_date,
            logo: data.logo
          });
          setFileName(data.logo || '');
        } catch (error) {
          console.error('Error:', error);
          alertError
        }
      }
    };
    fetchData();
  }, [isEditMode, id, peticionGet]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        logo: files[0]
      }));
      setFileName(files[0].name);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('currency', formData.currency);
    formDataToSend.append('foundation_date', formData.foundationDate);
    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }

    const url = isEditMode ? `http://localhost:3000/api/company/${id}` : 'http://localhost:3000/api/company';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });
      const data = await response.json();
      if (response.ok) {
        alertBasic(data.message);
        navigate(paths.DASHBOARD_PATH); // Redirige a una página de éxito o a la lista de empresas
      } else {
        alertError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alertError(error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full relative">
      <div className="bg-white p-8 xs:p-4 rounded-[28px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-4xl xs:max-h-xl mt-8 xs:mx-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Editar Empresa' : 'Registrar Empresa'}
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            />
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            />
          </div>

          {/* Campo País */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              País
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            >
              <option value="">Seleccione un país</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Moneda */}
          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Moneda
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={handleChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            >
              <option value="">Seleccione una moneda</option>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Fecha de Fundación */}
          <div className="mb-4">
            <label
              htmlFor="foundationDate"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha de Fundación
            </label>
            <input
              type="date"
              id="foundationDate"
              value={formData.foundationDate}
              onChange={handleChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            />
          </div>

          {/* Campo Logo (Opcional) */}
          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Logo (Opcional)
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="logo"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => document.getElementById("logo").click()}
                className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline w-48"
              >
                Agregar
              </button>
              <span id="file-name" className="ml-2 text-gray-700 truncate max-w-xs">{fileName}</span>
            </div>
          </div>

          {/* Botón de Registrar */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center mt-4">
            <button
              type="submit"
              className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-48"
            >
              {isEditMode ? 'Actualizar' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
