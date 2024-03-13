const Home = ({ onGame }) => {
  return (
    <div>
      <div className="home">
        <h1 className="title"> MyType </h1>
      </div>
      <div>
        <button className="btnPlay" onClick={() => onGame("playGame")}>
          Play Game
        </button>
      </div>
    </div>
  );
};
export default Home;
