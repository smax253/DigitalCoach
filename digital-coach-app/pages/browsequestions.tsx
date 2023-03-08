import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

// import { DataGrid } from '@mui/x-data-grid';

import { TextField } from "@App/components/molecules/TextField";

import { 
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	Divider,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const sampleData = [
	{
		"createdAt": {
		"seconds": 1678232583,
		"nanoseconds": 198000000
		},
		"companies": [],
		"question": "If you are interested in public accounting, are you more interested in tax or audit?",
		"createdBy": null,
		"lastUpdatedAt": {
		"seconds": 1678232583,
		"nanoseconds": 198000000
		},
		"subject": "Business Accounting and Analytics",
		"popularity": 0,
		"position": "Accountant",
		"type": "Technical"
	},
	{
		"createdAt": {
		"seconds": 1678232583,
		"nanoseconds": 199000000
		},
		"companies": [],
		"question": "What are some of your strengths that will allow you to endure the frantic demands of tax season or a difficult audit?",
		"createdBy": null,
		"lastUpdatedAt": {
		"seconds": 1678232583,
		"nanoseconds": 199000000
		},
		"subject": "Business Accounting and Analytics",
		"popularity": 0,
		"position": "Accountant",
		"type": "Technical"
		},
];

function BrowseQuestionsPage() { 
	const { currentUser } = useAuthContext();

	return (
		<div>
			<h1>Browse Questions</h1>
			<TextField title="Search"></TextField>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{
					sampleData.map((question) => (
						<div>
							<ListItem>
								<ListItemIcon>
									<IconButton>
										<AddIcon />
									</IconButton>
								</ListItemIcon>
								<ListItemText 
									primary={question.question}
									secondary={[question.subject, question.type, question.position].join(" | ")}
									/>
							</ListItem>
							<Divider />
						</div>
					))
				}
			</List>
		</div>
	);
}

export default function BrowseQuestions() {
	  return (
	<AuthGuard>
		<BrowseQuestionsPage />
	</AuthGuard>
  );
}