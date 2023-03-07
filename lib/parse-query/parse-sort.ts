import type { SearchParameters, SortValue } from "../types";
import normalizeStringInput from "../normalizeStringInput";

const SUPPORTED_OPERATORS = [":", "="];

export default function parseSort(
  params: SearchParameters,
  operator: string,
  value: string
): void {
  if (params.sort) {
    params.errors.push({
      key: "sort",
      value,
      message: `Sort option "${params.sort}" already chosen. Sorting by "${value}" will be ignored.`,
    });

    return;
  }

  if (!SUPPORTED_OPERATORS.includes(operator)) {
    params.errors.push({
      key: "sort",
      value,
      message: `Sort does not support the "${operator}" operator.`,
    });

    return;
  }

  value = normalizeStringInput(value);

  switch (value) {
    case "prerequisites":
    case "steps":
    case "results":
    case "cards":
    case "created":
      // make no changes to value
      break;
    case "ci":
    case "coloridentity":
    case "color":
    case "colors":
      value = "colors";
      break;
    case "deck":
    case "decks":
    case "popularity":
      value = "popularity";
      break;
    case "usd":
    case "price":
      value = "price";
      break;
    default:
      params.errors.push({
        key: "sort",
        value,
        message: `Unknown sort option "${value}".`,
      });
      return;
  }

  params.sort = value as SortValue;
}
