import './Home.scss';

export default function Home() {
  function reload() {
    console.log('refresh')
    window.location.reload()
  }

  return (
    <div className="home" onClick={reload}>
      <h1 className="home__title">Alego Tools</h1>
      <p className="home__text">Clique em alguma aba para começar</p>
    </div>
  );
}
