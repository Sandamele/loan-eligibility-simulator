import { Card, CardContent } from "../ui/card";
import { FormGroup } from "../ui/FormGroup";
import { InputWithIcon } from "../ui/inputWithIcon";
import { RandIcon } from "../ui/randIcon";
import { FormHeader } from "./FormHeader";

import { FaRegChartBar } from "react-icons/fa";
export const StepFinancial = ({ formik }) => {
  return (
    <Card>
      <CardContent>
        <FormHeader
          title="Financial Details"
          subTitle="This information helps calculate your eligibility score."
        />
        <div className="bg-blue-50 pt-6 px-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <RandIcon className="text-2xl bg-blue-200 text-bright-blue px-3 py-1 rounded-lg" />
            <div>
              <h3 className="font-semibold">Monthly Income</h3>
              <p className="text-sm text-slate-500">
                Your take-home pay after taxes
              </p>
            </div>
          </div>
          <FormGroup
            error={formik.errors.financial?.monthlyIncome}
            showError={formik.touched.financial?.monthlyIncome}
          >
            <InputWithIcon
              icon={<RandIcon className="text-lg text-slate-500" />}
              alignIcon="inline-start"
              type="number"
              name="financial.monthlyIncome"
              value={formik.values.financial.monthlyIncome}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FormGroup
            label="Monthly Expenses"
            error={formik.errors.financial?.monthlyExpenses}
            showError={formik.touched.financial?.monthlyExpenses}
          >
            <InputWithIcon
              icon={<RandIcon className="text-lg text-slate-500" />}
              alignIcon="inline-start"
              type="number"
              name="financial.monthlyExpenses"
              value={formik.values.financial.monthlyExpenses}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup label="Existing Debt Payments">
            <InputWithIcon
              icon={<RandIcon className="text-lg text-slate-500" />}
              alignIcon="inline-start"
              type="number"
              name="financial.existingDebt"
              value={formik.values.financial.existingDebt}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </div>
        <FormGroup
          label="Estimated Credit Score"
          error={formik.errors.financial?.creditScore}
          showError={formik.touched.financial?.creditScore}
        >
          <InputWithIcon
            icon={<FaRegChartBar className="text-slate-500" />}
            alignIcon="inline-start"
            type="number"
            name="financial.creditScore"
            value={formik.values.financial.creditScore}
            onChange={formik.handleChange}
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};
