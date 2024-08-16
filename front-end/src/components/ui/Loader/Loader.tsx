import logo from '../../../assets/HardAndSmartLogo.gif';

/**
 * @constant Loader - A component that displays a loader.
 * @description A component that displays a loader animation with the HardAndSmart logo.
 * @returns The Loader component.
 */
const Loader = () => {
  return <img src={logo} style={{ width: '100px', height: '100px' }} />;
};

export default Loader;
