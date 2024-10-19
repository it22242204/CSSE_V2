import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PaymentsList from "./PaymentsList"; // First class: PaymentsList component
import Sidebar from "../AdminDashBord/SideBar/Sidebar"; // Second class: Sidebar component

// Mock the axios requests
const mock = new MockAdapter(axios);

describe("PaymentsList Component", () => {
  // Positive test case for successful data fetching
  it("fetches and displays payment data", async () => {
    const mockPayments = [
      {
        _id: "1",
        cartItems: [{ name: "Plastic", qty: 5, total: 250 }],
        amount: 250,
        currency: "LKR",
        status: "Paid",
        cardNumber: "1234567812345678",
      },
    ];

    mock.onGet("http://localhost:8081/payments").reply(200, { payments: mockPayments });

    render(<PaymentsList />);

    expect(screen.getByText(/Payment List/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Plastic/i)).toBeInTheDocument();
      expect(screen.getByText(/250/i)).toBeInTheDocument();
      expect(screen.getByText(/Paid/i)).toBeInTheDocument();
    });
  });

  // Negative test case for error handling
  it("handles error during data fetching", async () => {
    mock.onGet("http://localhost:8081/payments").reply(500);

    render(<PaymentsList />);

    await waitFor(() => {
      expect(screen.queryByText(/Plastic/i)).not.toBeInTheDocument();
    });
  });

  // Positive test case for search functionality
  it("filters payment results based on search query", async () => {
    const mockPayments = [
      {
        _id: "1",
        cartItems: [{ name: "Plastic", qty: 5, total: 250 }],
        amount: 250,
        currency: "LKR",
        status: "Paid",
        cardNumber: "1234567812345678",
      },
      {
        _id: "2",
        cartItems: [{ name: "Glass", qty: 3, total: 150 }],
        amount: 150,
        currency: "LKR",
        status: "Refunded",
        cardNumber: "8765432187654321",
      },
    ];

    mock.onGet("http://localhost:8081/payments").reply(200, { payments: mockPayments });

    render(<PaymentsList />);

    await waitFor(() => {
      expect(screen.getByText(/Plastic/i)).toBeInTheDocument();
      expect(screen.getByText(/Glass/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Search Here.../i), {
      target: { value: "Plastic" },
    });

    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(screen.getByText(/Plastic/i)).toBeInTheDocument();
      expect(screen.queryByText(/Glass/i)).not.toBeInTheDocument();
    });
  });

  // Positive test case for delete functionality
  it("deletes a payment successfully", async () => {
    const mockPayments = [
      {
        _id: "1",
        cartItems: [{ name: "Plastic", qty: 5, total: 250 }],
        amount: 250,
        currency: "LKR",
        status: "Paid",
        cardNumber: "1234567812345678",
      },
    ];

    mock.onGet("http://localhost:8081/payments").reply(200, { payments: mockPayments });
    mock.onDelete("http://localhost:8081/payments/1").reply(200);

    render(<PaymentsList />);

    await waitFor(() => {
      expect(screen.getByText(/Plastic/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Delete/i));

    window.confirm = jest.fn(() => true);

    await waitFor(() => {
      expect(screen.queryByText(/Plastic/i)).not.toBeInTheDocument();
    });
  });

  // Positive test case for update functionality
  it("updates the payment status to Refunded", async () => {
    const mockPayments = [
      {
        _id: "1",
        cartItems: [{ name: "Plastic", qty: 5, total: 250 }],
        amount: 250,
        currency: "LKR",
        status: "Paid",
        cardNumber: "1234567812345678",
      },
    ];

    mock.onGet("http://localhost:8081/payments").reply(200, { payments: mockPayments });
    mock.onPut("http://localhost:8081/payments/1").reply(200);

    render(<PaymentsList />);

    await waitFor(() => {
      expect(screen.getByText(/Paid/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Update/i));

    window.confirm = jest.fn(() => true);

    await waitFor(() => {
      expect(screen.getByText(/Refunded/i)).toBeInTheDocument();
    });
  });
});

describe("Sidebar Component", () => {
  // Test Sidebar rendering
  it("renders Sidebar component", () => {
    render(<Sidebar />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
