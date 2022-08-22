import "./MobileMessage.styles.scss";

export default function MobileMessage() {
  return (
    <div className="wrapper">
      <section className="game__MobileMessage">
        <h2>Sorry, 😢</h2>
        <p>
          This game can only be played on devices like most tablets and
          computers, I couldn't find a way to make it work properly on mobile
          devices. But hey, all of my other projects work on mobile, go look at
          them in <a href="https://imadfxq.com/">my portfolio</a>
        </p>
      </section>
    </div>
  );
}
