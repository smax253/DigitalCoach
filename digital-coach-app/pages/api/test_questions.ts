

import type { NextApiRequest, NextApiResponse } from "next";
import QuestionService from "@App/lib/question/QuestionService";


export default async function run_tests(
	req: NextApiRequest,
	res: NextApiResponse<{}>
) {
	const test_results = [];

	try {
		console.log("Testing getBySubject()...");
		const data = await QuestionService.getBySubject("math");
		test_results.push(
			{
				"Test": "getBySubject()",
				"Result": "Success",
				"Data": data.docs.map((doc) => doc.data())
			}
		);

		console.log("getBySubject() successful");
		console.log(data.docs.map((doc) => doc.data()));

	} catch (e) {
		
		console.log("Error in getBySubject():");
		console.log(e);

		test_results.push(
			{
				"Test": "getBySubject()",
				"Result": "Failure",
				"Error": e
			}
		);

	}

	try { 
		console.log("Testing getbyPosition()...");
		const data = await QuestionService.getByPosition("accountant");
		test_results.push(
			{
				"Test": "getByPosition()",
				"Result": "Success",
				"Data": data.docs.map((doc) => doc.data())
			}
		);

		console.log("getByPosition() successful");
		console.log(data.docs.map((doc) => doc.data()));

	} catch (e) { 
		console.log("Error in getByPosition():");
		console.log(e);

		test_results.push(
			{
				"Test": "getByPosition()",
				"Result": "Failure",
				"Error": e
			}
		);
	}

	return res.status(200).json({ test_results: test_results })

}