import { generate } from "shortid";

export function generatePrefixedId(prefix = "custom-id") {
	return `${prefix}_${generate()}`;
}
