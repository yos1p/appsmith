import { extractIdentifiersFromCode, Extractions } from "@shared/ast";

type IdentifiersResponse = {
  identifiers: string[];
};
export default class AstService {
  static async getIdentifiersFromScript(
    script,
    evalVersion
  ): Promise<IdentifiersResponse> {
    return new Promise((resolve, reject) => {
      try {
        const extractions: Extractions = extractIdentifiersFromCode(
          script,
          evalVersion
        );

        const data: IdentifiersResponse = {
          identifiers: extractions.identifiers,
        };
        resolve(extractions);
      } catch (err) {
        reject(err);
      }
    });
  }
}
