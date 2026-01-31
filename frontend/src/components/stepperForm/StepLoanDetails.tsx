import { CiMoneyBill } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { Card, CardContent } from "../ui/card";
import { FormHeader } from "./FormHeader";
import { FormGroup } from "../ui/formGroup";
import { InputWithIcon } from "../ui/inputWithIcon";
import { SelectableCardGroup } from "./SelectableCardGroup";
import { RandIcon } from "../ui/randIcon";
import { IoCashOutline } from "react-icons/io5";
import { Dropdown } from "../ui/dropdown";
import { AiOutlineCalendar } from "react-icons/ai";
import { formatMoney } from "@/lib/formatMoney";
import { useState } from "react";
import type { StepperFormikProps } from "@/types/stepperFormikTypes";

export const StepLoanDetails = ({ formik }: StepperFormikProps) => {
  const loanProducts = [
    {
      id: "personal_loan",
      label: "Personal Loan",
      icon: <CiMoneyBill />,
      minAmount: 5000.0,
      maxAmount: 300000.0,
      min: 6,
      max: 60,
    },
    {
      id: "car_loan",
      label: "Car Loan",
      icon: <IoHomeOutline />,
      minAmount: 50000.0,
      maxAmount: 1500000.0,
      min: 12,
      max: 72,
    },
    {
      id: "home_loan",
      label: "Home Loan",
      icon: <FaCarAlt />,
      minAmount: 150000.0,
      maxAmount: 3500000.0,
      min: 24,
      max: 240,
    },
  ];
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const handleSelect = (id: string) => {
    const product = loanProducts.find((loanProduct) => loanProduct.id === id);
    formik.setFieldValue("loanDetails.loanProduct", id);
    formik.setFieldValue("loanDetails.minLoanAmount", product?.minAmount);
    formik.setFieldValue("loanDetails.maxLoanAmount", product?.maxAmount);
    formik.setFieldValue("loanDetails.minTerm", product?.min);
    formik.setFieldValue("loanDetails.maxTerm", product?.max);
    setMaxLoanAmount(product?.maxAmount || 0);
    setMinLoanAmount(product?.minAmount || 0);
  };
  const Purpose = [
    { value: "6", label: "6 month" },
    { value: "12", label: "12 month" },
    { value: "24", label: "24 month" },
    { value: "36", label: "36 month" },
  ];
  return (
    <Card>
      <CardContent>
        <FormHeader
          title="Loan Preferences"
          subTitle="Select the loan type and amount you'd like to simulate."
        />
        <FormGroup
          label="What type of loan?"
          error={formik.errors.loanDetails?.loanProduct}
          showError={formik.touched.loanDetails?.loanProduct}
        >
          <SelectableCardGroup
            items={loanProducts}
            selectedId={formik.values.loanDetails.loanProduct}
            onSelect={handleSelect}
          />
        </FormGroup>
        <div className="bg-slate-100 pt-6 px-6 rounded-xl border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <IoCashOutline className="text-4xl bg-bright-blue text-white px-1 py-1 rounded-lg" />
            <div>
              <h3 className="font-semibold">Desired Loan Amount</h3>
              {formik.values.loanDetails.loanProduct !== "" && (
                <p className="text-sm text-slate-500">
                  Enter between {formatMoney(minLoanAmount, "R")} -{" "}
                  {formatMoney(maxLoanAmount, "R")}
                </p>
              )}
            </div>
          </div>
          <FormGroup
            error={formik.errors.loanDetails?.requestedAmount}
            showError={formik.touched.loanDetails?.requestedAmount}
          >
            <InputWithIcon
              icon={<RandIcon className="text-lg text-slate-500" />}
              alignIcon="inline-start"
              type="number"
              name="loanDetails.requestedAmount"
              value={formik.values.loanDetails.requestedAmount}
              onChange={formik.handleChange}
              disabled={formik.values.loanDetails.loanProduct === ""}
            />
          </FormGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 md:gap-4">
          <FormGroup
            label="Preferred Term (months)"
            error={formik.errors.loanDetails?.loanTerm}
            showError={formik.touched.loanDetails?.loanTerm}
          >
            <InputWithIcon
              icon={<AiOutlineCalendar />}
              alignIcon="inline-start"
              type="number"
              name="loanDetails.loanTerm"
              value={formik.values.loanDetails.loanTerm}
              onChange={formik.handleChange}
              disabled={formik.values.loanDetails.loanProduct === ""}
            />
          </FormGroup>
          <FormGroup label="Specific Purpose">
            <Dropdown items={Purpose} placeholder="Select purpose" />
          </FormGroup>
        </div>
      </CardContent>
    </Card>
  );
};
