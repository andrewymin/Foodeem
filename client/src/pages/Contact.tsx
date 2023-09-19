// import { useEffect } from "react";

function Relax() {
  const contactImg =
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80";

  return (
    <section id="contact">
      <img className="contact-img" src={contactImg} alt="Cooking utensils" />
      <div className="contact-inputs">
        <h1>Contact Us</h1>
        <div className="inputs">
          <label htmlFor="user-name">Full Name</label>
          <input
            type="text"
            name="user-name"
            id="user-name"
            placeholder="Enter full name..."
          />
          <label htmlFor="user-email">Email</label>
          <input
            type="email"
            name="user-email"
            id="user-email"
            placeholder="Enter email..."
          />
          <label htmlFor="user-msg">Message</label>
          <textarea
            name="user-msg"
            id="user-msg"
            cols={30}
            rows={10}
            placeholder="Enter Message..."
          ></textarea>
          <button>Send Message</button>
        </div>
      </div>
    </section>
  );
}

export default Relax;
