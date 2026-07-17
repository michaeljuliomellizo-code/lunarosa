"use client";

import { useEffect, useMemo } from "react";
import { colombia } from "@/lib/colombia";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Props {
  department: string;
  municipality: string;
  onDepartmentChange: (value: string) => void;
  onMunicipalityChange: (value: string) => void;
  disabled?: boolean;
}

export default function DepartmentMunicipalitySelector({
  department,
  municipality,
  onDepartmentChange,
  onMunicipalityChange,
  disabled = false,
}: Props) {

  const { isDark } =
    useTheme();

  const municipalities = useMemo(() => {
    const selectedDepartment = colombia.find(
      (item) => item.name === department
    );

    return selectedDepartment?.cities ?? [];
  }, [department]);

  useEffect(() => {
    if (
      municipality &&
      !municipalities.includes(municipality)
    ) {
      onMunicipalityChange("");
    }
  }, [
    municipality,
    municipalities,
    onMunicipalityChange,
  ]);

  return (
    <>
      <select
        value={department}
        onChange={(e) => {
          onDepartmentChange(e.target.value);
          onMunicipalityChange("");
        }}
        disabled={disabled}
        className="border rounded-lg p-3 w-full"
        required
      >
        <option value="">
          Seleccione un departamento
        </option>

        {colombia.map((item) => (
          <option
            key={item.id}
            value={item.name}
          >
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={municipality}
        onChange={(e) =>
          onMunicipalityChange(e.target.value)
        }
        disabled={
          disabled || !department
        }
        className="border rounded-lg p-3 w-full"
        required
      >
        <option value="">
          Seleccione un municipio
        </option>

        {municipalities.map((city) => (
          <option
            key={city}
            value={city}
          >
            {city}
          </option>
        ))}
      </select>
    </>
  );
}