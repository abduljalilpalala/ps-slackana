import moduleStyle from './loading.module.css';

function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed bg-transparent !z-50" >
      <div className={`${moduleStyle.ldsRipple} z-50`}><div></div><div></div></div>
      <div className={`bg-gray-300 h-screen w-screen absolute z-40 opacity-30`}></div>
    </div>
  );
}

export default LoadingScreen;
