

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

	try {
		console.log("Testing getByCompany()...");
		const data = await QuestionService.getByCompany(["amazon"]);
		test_results.push(
			{
				"Test": "getByCompany()",
				"Result": "Success",
				"Data": data.docs.map((doc) => doc.data())
			}
		);
	} catch (e) { 
		console.log("Error in getByCompany():");
		console.log(e);

		test_results.push(
			{
				"Test": "getByCompany()",
					"Result": "Failure",
				"Error": e
			}
		);
	}

	try {
		console.log("Testing getByType()...");
		const data = await QuestionService.getByType("behavioral");
		test_results.push(
			{
				"Test": "getByType()",
				"Result": "Success",
				"Data": data.docs.map((doc) => doc.data())
			}
		);
	} catch (e) {
		console.log("Error in getByType():");
		console.log(e);

		test_results.push(
			{
				"Test": "getByType()",
				"Result": "Failure",
				"Error": e
			}
		);
	}

	try {
		console.log("Testing getByPopularityDesc()...");
		const data = await QuestionService.getByPopularityDesc();
		test_results.push(
			{
				"Test": "getByPopularityDesc()",
				"Result": "Success",
				"Data": data.docs.map((doc) => doc.data())
			}
		);
	} catch (e) {
		console.log("Error in getByPopularityDesc():");
		console.log(e);

		test_results.push(
			{
				"Test": "getByPopularityDesc()",
				"Result": "Failure",
				"Error": e
			}
		);
	}

	return res.status(200).json({ test_results: test_results })

}