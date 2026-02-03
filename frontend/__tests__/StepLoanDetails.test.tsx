import { render, screen } from "@testing-library/react";
import { StepLoanDetails } from "../src/components/stepperForm/StepLoanDetails";
import { Formik } from "formik";
import * as fetchHook from "../src/hook/useFetch";
import userEvent from "@testing-library/user-event";

jest.mock("@/hook/useFetch", () => ({
  useFetch: jest.fn(() => ({
    data: { products: [] },
    loading: false,
  })),
}));
jest.mock("@/lib/formatMoney", () => ({
  formatMoney: jest.fn((amount: number) => `R${amount}`),
}));

describe("StepLoanDetails component", () => {
  const initialValues = {
    loanDetails: {
      loanType: "",
      requestedAmount: "",
      loanTerm: "",
      minLoanAmount: 0,
      maxLoanAmount: 0,
      minTerm: 0,
      maxTerm: 0,
    },
  };

  const loanProductsMock = [
    {
      id: "loan1",
      name: "Personal Loan",
      minAmount: 1000,
      maxAmount: 5000,
      minTerm: 6,
      maxTerm: 24,
      purposes: ["debt_consolidation", "car_purchase"],
    },
    {
      id: "loan2",
      name: "Business Loan",
      minAmount: 5000,
      maxAmount: 20000,
      minTerm: 12,
      maxTerm: 36,
      purposes: ["equipment", "expansion"],
    },
  ];

  beforeEach(() => {
    (fetchHook.useFetch as jest.Mock).mockReturnValue({
      data: { products: loanProductsMock },
      loading: false,
    });
    jest.clearAllMocks();
  });

  const renderComponent = (values = initialValues) =>
    render(
      <Formik initialValues={values} onSubmit={jest.fn()}>
        {(formik) => <StepLoanDetails formik={formik} />}
      </Formik>,
    );

  describe("initial render", () => {
    it("shows the loan type label and cards", () => {
      renderComponent();

      expect(screen.getByText(/What type of loan\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Personal Loan/i)).toBeInTheDocument();
      expect(screen.getByText(/Business Loan/i)).toBeInTheDocument();
    });

    it("keeps requested amount and loan term inputs disabled when no loan type is selected", () => {
      renderComponent();

      const requestedInput = screen.getByPlaceholderText("Enter loan amount");
      const termInput = screen.getByPlaceholderText(
        "Enter loan term in months",
      );

      expect(requestedInput).toBeDisabled();
      expect(termInput).toBeDisabled();
    });
  });

  describe("after selecting a loan type", () => {
    it("updates Formik values for selected loan", async () => {
      renderComponent();
      const user = userEvent.setup();

      const loanCard = screen.getByText(/Personal Loan/i);
      await user.click(loanCard);

      expect(screen.getByText(/Enter between .* - .*/i)).toBeInTheDocument();
    });
  });
});
