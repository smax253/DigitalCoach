import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import { useState, useEffect } from "react";

import styles from "@App/styles/BrowseQuestionsPage.module.scss";

import { 
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	Divider,
	TextField,
	Box,
	Checkbox,
	Select,
	MenuItem,
	InputLabel,
	FormControl
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

const sampleSubjects = [ 
	"Business Accounting and Analytics",
	"Business Management",
	"Business Marketing",
	"Business Operations",
	"Business Strategy",
	"Business Technology",
	"Data Science",
	"Finance",
	"Human Resources",
	"Information Technology",
	"Law",
]

function BrowseQuestionsPage() { 
	const { currentUser } = useAuthContext();

	


	return (
		<div className={styles.BrowseQuestionsPage}>
			<h1>Browse Questions</h1>
			<TextField label='Search Questions'></TextField>
			<Box sx={{
				maxWidth: '80%',
				display: 'flex', 
				flexDirection: 'row',   
				verticalAlign: 'top',
				mt: 2
				}}
			>
				<List sx={{ bgcolor: 'background.paper' }}>
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
				<Box 
				id='#filters'
				sx={{
					maxWidth: '20%',
					display: 'flex',
					flexDirection: 'column',
					verticalAlign: 'top',
					mt: 2,
					ml: 4,
					border: '1px solid black',
					padding: 4,
				}}>
					
					<h2>Filters</h2>

					<FormControl size="small">
						<div>
							<label htmlFor='popularity-check-box'>Sort By Popularity</label>
							<Checkbox id='popularity-check-box'></Checkbox>
						</div>
						<label htmlFor='subject-select'>Subject</label>
						<Select
							id='subject-select'
							value="Any"
						>
							<MenuItem value='Any'>Any</MenuItem>
							{
								sampleSubjects.map((subject) => (
									<MenuItem value={subject}>{subject}</MenuItem>
									))
							}
						</Select>
						<label htmlFor='type-select'>Type</label>
						<Select
							id='type-select'
							value="Any"
						>
							<MenuItem value='Any'>Any</MenuItem>
							<MenuItem value='Technical'>Technical</MenuItem>
							<MenuItem value='Behavioral'>Behavioral</MenuItem>
						</Select>
						<label htmlFor='experience-level-select'>Experience Level</label>
						<Select
							id='experience-level-select'
							value="Any"
						>
							<MenuItem value='Any'>Any</MenuItem>
							<MenuItem value='Entry'>Entry</MenuItem>
							<MenuItem value='Mid'>Mid</MenuItem>
							<MenuItem value='Senior'>Senior</MenuItem>
						</Select>


					</FormControl>
				</Box>
			</Box>
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