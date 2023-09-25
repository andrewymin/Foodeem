function About() {
  const aboutImg =
    "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80";

  return (
    <section id="about">
      <img src={aboutImg} alt="Cooking Board" />
      <div className="content">
        <h1>About Us</h1>
        <h2 className="title">Finding Great Recipes</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus,
          possimus accusantium commodi assumenda recusandae unde veniam
          consectetur praesentium! Aperiam rerum consequuntur, quidem harum
          adipisci nostrum eaque totam aspernatur. Ducimus, earum?
        </p>
      </div>
    </section>
  );
}

export default About;
