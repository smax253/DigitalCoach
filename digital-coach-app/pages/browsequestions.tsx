import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";

import styles from "@App/styles/BrowseQuestionsPage.module.scss";


// import { DataGrid } from '@mui/x-data-grid';

// import { TextField } from "@App/components/molecules/TextField";

import { 
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	Divider,
	TextField,
	Box,
	Checkbox
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
				<div className='filter-div'>
					<h2>Filters</h2>
					<label htmlFor='popularity-check-box'>Sort By Popularity</label>
					<input type="checkbox" id='popularity-check-box'></input>
					<label htmlFor='subject-select'>Subject</label>
					<select id='subject-select'>
						{
							sampleSubjects.map((subject) => (
								<option value={subject}>{subject}</option>
							))
						}
					</select>
					<label htmlFor='type-select'>Type</label>
					<select id='type-select'>
						<option value='Technical'>Technical</option>
						<option value='Behavioral'>Behavioral</option>
					</select>
					<label htmlFor='experience-level-select'>Experience Level</label>
					<select id='experience-level-select'>
						<option value='Entry'>Entry</option>
						<option value='Mid'>Mid</option>
						<option value='Senior'>Senior</option>
					</select>

				</div>
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