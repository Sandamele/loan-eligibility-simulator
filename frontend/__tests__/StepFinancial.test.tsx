import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { StepFinancial } from "../src/components/stepperForm/StepFinancial";

describe("StepFinancial component", () => {
  const initialValues = {
    financial: {
      monthlyIncome: "",
      monthlyExpenses: "",
      existingDebt: "",
      creditScore: "",
    },
  };

  const renderComponent = () =>
    render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        {(formik) => <StepFinancial formik={formik} />}
      </Formik>,
    );

  it("renders all financial input fields", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("40000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("3000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("605")).toBeInTheDocument();
  });

  it("updates monthly income when typing", async () => {
    const user = userEvent.setup();
    renderComponent();

    const incomeInput = screen.getByPlaceholderText("40000");
    await user.type(incomeInput, "50000");

    expect(incomeInput).toHaveValue(50000);
  });

  it("updates monthly expenses when typing", async () => {
    const user = userEvent.setup();
    renderComponent();

    const expensesInput = screen.getByPlaceholderText("2000");
    await user.type(expensesInput, "2500");

    expect(expensesInput).toHaveValue(2500);
  });

  it("updates existing debt when typing", async () => {
    const user = userEvent.setup();
    renderComponent();

    const debtInput = screen.getByPlaceholderText("3000");
    await user.type(debtInput, "4500");

    expect(debtInput).toHaveValue(4500);
  });

  it("updates credit score when typing", async () => {
    const user = userEvent.setup();
    renderComponent();

    const creditInput = screen.getByPlaceholderText("605");
    await user.type(creditInput, "720");

    expect(creditInput).toHaveValue(720);
  });
});
