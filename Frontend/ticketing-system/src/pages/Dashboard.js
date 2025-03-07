import React, { Component } from "react";
//import api from "../services/api";

class Dashboard extends Component {
  state = {
    tickets: [], // List of tickets
    newTicket: { title: "", description: "" }, // Form state for new ticket
  };

  // Fetch tickets when the component mounts
  async componentDidMount() {
    await this.fetchTickets();
  }

  // Fetch tickets from the backend
  //   fetchTickets = async () => {
  // try {
  //   const res = await api.get("/tickets");
  //   this.setState({ tickets: res.data });
  // } catch (error) {
  //   console.error("Failed to fetch tickets:", error);
  // }
  //   };

  // Handle form input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newTicket: { ...this.state.newTicket, [name]: value },
    });
  };

  // Handle form submission to create a new ticket
  handleSubmit = async (e) => {
    e.preventDefault();
    //try {
    //   await api.post("/tickets", this.state.newTicket);
    //   this.setState({ newTicket: { title: "", description: "" } }); // Clear form
    //   await this.fetchTickets(); // Refresh ticket list
    // } catch (error) {
    //   console.error("Failed to create ticket:", error);
    // }
  };

  render() {
    const { tickets, newTicket } = this.state;

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Tickets</h1>

        {/* Form to create a new ticket */}
        <form onSubmit={this.handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newTicket.title}
              onChange={this.handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={newTicket.description}
              onChange={this.handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Ticket
          </button>
        </form>

        {/* List of tickets */}
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-xl font-semibold">{ticket.title}</h2>
              <p className="text-gray-700">{ticket.description}</p>
              <p className="text-sm text-gray-500">Status: {ticket.status}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
