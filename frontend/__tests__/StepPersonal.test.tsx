import { render, screen, fireEvent } from "@testing-library/react";
import { StepPersonal } from "../src/components/stepperForm/StepPersonal";
import { Formik } from "formik";

describe("StepPersonal component", () => {
  const initialValues = {
    personal: {
      age: "",
      employmentStatus: "",
      employmentDuration: "",
    },
  };

  const renderComponent = (values = initialValues) =>
    render(
      <Formik initialValues={values} onSubmit={jest.fn()}>
        {(formik) => <StepPersonal formik={formik} />}
      </Formik>,
    );

  it("renders the age and employment duration fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/Your age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Months at current job/i)).toBeInTheDocument();
  });

  it("disables employment duration input when unemployed or retired", () => {
    renderComponent({
      personal: {
        age: "",
        employmentStatus: "unemployed",
        employmentDuration: "",
      },
    });
    const input = screen.getByLabelText(
      /months at current job/i,
    ) as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("enables employment duration input when employed or self-employed", () => {
    renderComponent({
      personal: {
        age: "",
        employmentStatus: "employed",
        employmentDuration: "",
      },
    });
    const input = screen.getByLabelText(
      /Months at current job/i,
    ) as HTMLInputElement;
    expect(input).not.toBeDisabled();

    renderComponent({
      personal: {
        age: "",
        employmentStatus: "self_employed",
        employmentDuration: "",
      },
    });
    const input2 = screen.getByLabelText(
      /months self-employed/i,
    ) as HTMLInputElement;
    expect(input2).not.toBeDisabled();
  });

  it("updates employment status when a card is clicked", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button", { name: /Employed/i });
    const employedCard = buttons[0];

    fireEvent.click(employedCard);

    expect(employedCard.classList.contains("selected")).toBe(false);
  });
});
