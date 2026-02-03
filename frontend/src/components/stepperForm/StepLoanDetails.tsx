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
import { useFetch } from "@/hook/useFetch";
import type {
  LoanProductsResponseType,
  LoanProductType,
} from "@/types/loanProductType";

export const StepLoanDetails = ({ formik }: StepperFormikProps) => {
  const { data, loading } =
    useFetch<LoanProductsResponseType>("loans/products");
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [productPurposes, setProductPursoe] = useState<
    { value: string; label: string }[]
  >([]);
  const handleSelect = (id: string) => {
    const product = data?.products.find(
      (loanProduct: LoanProductType) => loanProduct.id === id,
    );
    formik.setFieldValue("loanDetails.loanType", id);
    formik.setFieldValue("loanDetails.minLoanAmount", product?.minAmount);
    formik.setFieldValue("loanDetails.maxLoanAmount", product?.maxAmount);
    formik.setFieldValue("loanDetails.minTerm", product?.minTerm);
    formik.setFieldValue("loanDetails.maxTerm", product?.maxTerm);
    setMaxLoanAmount(product?.maxAmount || 0);
    setMinLoanAmount(product?.minAmount || 0);

    setProductPursoe(
      product?.purposes?.map((purpose: string) => ({
        value: purpose,
        label: purpose
          .split("_")
          .map(
            (word: string) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" "),
      })) ?? [],
    );
  };

  return (
    <Card>
      <CardContent>
        <FormHeader
          title="Loan Preferences"
          subTitle="Select the loan type and amount you'd like to simulate."
        />
        <FormGroup
          label="What type of loan?"
          error={formik.errors.loanDetails?.loanType}
          showError={formik.touched.loanDetails?.loanType}
          htmlFor="loanDetails.loanType"
        >
          {!loading ? (
            <SelectableCardGroup
              items={data?.products ?? []}
              selectedId={formik.values.loanDetails.loanType}
              onSelect={handleSelect}
            />
          ) : (
            "Loading..."
          )}
        </FormGroup>
        <div className="bg-slate-100 pt-6 px-6 rounded-xl border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <IoCashOutline className="text-4xl bg-bright-blue text-white px-1 py-1 rounded-lg" />
            <div>
              <h3 className="font-semibold">Desired Loan Amount</h3>
              {formik.values.loanDetails.loanType !== "" && (
                <p className="text-sm text-slate-500">
                  Enter between {formatMoney(minLoanAmount, "R")} -{" "}
                  {formatMoney(maxLoanAmount, "R")}
                </p>
              )}
            </div>
          </div>
          <FormGroup
            label=""
            error={formik.errors.loanDetails?.requestedAmount}
            showError={formik.touched.loanDetails?.requestedAmount}
            htmlFor="loanDetails.requestedAmount"
          >
            <InputWithIcon
              icon={<RandIcon className="text-lg text-slate-500" />}
              alignIcon="inline-start"
              type="number"
              name="loanDetails.requestedAmount"
              value={formik.values.loanDetails.requestedAmount}
              onChange={formik.handleChange}
              disabled={formik.values.loanDetails.loanType === ""}
              placeholder="Enter loan amount"
            />
          </FormGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 md:gap-4">
          <FormGroup
            label="Preferred Term"
            error={formik.errors.loanDetails?.loanTerm}
            showError={formik.touched.loanDetails?.loanTerm}
            htmlFor="loanDetails.loanTerm"
          >
            <InputWithIcon
              icon={<AiOutlineCalendar />}
              alignIcon="inline-start"
              type="number"
              name="loanDetails.loanTerm"
              value={formik.values.loanDetails.loanTerm}
              onChange={formik.handleChange}
              disabled={formik.values.loanDetails.loanType === ""}
              placeholder="Enter loan term in months"
            />
          </FormGroup>
          <FormGroup label="Specific Purpose">
            <Dropdown items={productPurposes} placeholder="Select purpose" />
          </FormGroup>
        </div>
      </CardContent>
    </Card>
  );
};
