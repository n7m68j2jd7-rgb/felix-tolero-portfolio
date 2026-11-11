export function HeaderClock() {
  return (
    <div className="tf-header-wrap">
      <a href="#home" className="logo-site fx-monogram d-lg-none" aria-label="Felix Tolero, home">
        FT
      </a>
      <div className="left">
        <div className="time-local text-body-3">
          <p className="date" />
          <p className="clock" />
        </div>
      </div>
    </div>
  );
}
