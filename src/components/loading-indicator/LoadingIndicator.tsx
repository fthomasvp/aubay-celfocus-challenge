import "./LoadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="container-lds-ring">
      <div data-testid="loadingIndicator" className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
