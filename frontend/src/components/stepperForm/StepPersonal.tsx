import { Card, CardContent } from "../ui/card";
import { FormGroup } from "../ui/FormGroup";
import { InputWithIcon } from "../ui/inputWithIcon";
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { BsSuitcaseLg } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GiPiggyBank } from "react-icons/gi";
import { FormHeader } from "./FormHeader";
import { SelectableCardGroup } from "./SelectableCardGroup";

export const StepPersonal = ({ formik }) => {
  const employmentStatuses = [
    { id: "employed", label: "Employed", icon: <BsSuitcaseLg /> },
    { id: "self_employed", label: "Self Employed", icon: <LuBuilding2 /> },
    { id: "unemployed", label: "Unemployed", icon: <FiUser /> },
    { id: "retired", label: "Retired", icon: <GiPiggyBank /> },
  ];
  const handleSelect = (id: string) => {
    formik.setFieldValue("personal.employmentStatus", id);
  };
  const employmentStatus = formik.values.personal.employmentStatus;
  const employmentDurationLabel =
    employmentStatus === "self_employed"
      ? "Months self-employed"
      : "Months at current job";
  return (
    <Card>
      <CardContent>
        <FormHeader
          title="Your profile"
          subTitle="Enter your details to simulate loan eligibility."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <FormGroup
            label="Your age"
            error={formik.errors.personal?.age}
            showError={formik.touched.personal?.age}
          >
            <InputWithIcon
              icon={<CiCalendarDate />}
              alignIcon="inline-start"
              placeholder="18"
              type="number"
              value={formik.values.personal.age}
              name="personal.age"
              id="personal.age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormGroup>
          <FormGroup
            label={employmentDurationLabel}
            error={formik.errors.personal?.employmentDuration}
            showError={formik.touched.personal?.employmentDuration}
          >
            <InputWithIcon
              icon={<IoTimeOutline />}
              alignIcon="inline-start"
              placeholder="3"
              type="number"
              value={formik.values.personal.employmentDuration}
              name="personal.employmentDuration"
              id="personal.employmentDuration"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={
                employmentStatus !== "employed" &&
                employmentStatus !== "self_employed"
              }
            />
          </FormGroup>
        </div>
        <FormGroup
          label="Employment Status"
          error={formik.errors.personal?.employmentStatus}
          showError={formik.touched.personal?.employmentStatus}
        >
          <SelectableCardGroup
            items={employmentStatuses}
            selectedId={employmentStatus}
            onSelect={handleSelect}
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};
