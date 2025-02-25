const GradientDivider = () => {
    return (
      <div className="relative my-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 h-px w-full bg-gradient-to-r from-transparent via-[rgb(130,167,251)]/30 to-transparent" />
      </div>
    );
  };
  
  export default GradientDivider;