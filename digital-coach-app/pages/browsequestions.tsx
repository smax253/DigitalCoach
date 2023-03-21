import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import { useState, useEffect } from "react";

import QuestionService from "@App/lib/question/QuestionService";


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
	FormControl,
	SelectChangeEvent,
	Button
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import { TExperienceLevel, TQuestionType, TSubject } from "@App/lib/question/models";




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

	const [popularityCheckbox, setPopularityCheckbox] = useState(true);
	const [experienceLevelSelect, setExperienceLevelSelect] = useState('Any');
	const [subjectSelect, setSubjectSelect] = useState('Any');
	const [typeSelect, setTypeSelect] = useState('Any');

	const [questionsData, setQuestionsData]= useState<any[]>([]);

	useEffect(() => { 
		async function fetchData() { 
			const questions : any[] = (await QuestionService.getByPopularityDesc()).docs.map((doc) => doc.data());
			setQuestionsData(questions);
			console.log(questions);
		}
		fetchData();
	}, []);


	const handlePopularityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPopularityCheckbox(event.target.checked);
	};

	const handleExperienceLevelChange = (event: SelectChangeEvent) => {
		setExperienceLevelSelect(event.target.value);
	};

	const handleSubjectChange = (event: SelectChangeEvent) => {
		setSubjectSelect(event.target.value);
	};

	const handleTypeChange = (event: SelectChangeEvent) => {
		setTypeSelect(event.target.value);
	};

	const handleFilterSubmit = async () => {
		const data = await QuestionService.getByFilters( 
			subjectSelect as TSubject, 
			typeSelect as TQuestionType,
			experienceLevelSelect as TExperienceLevel, 
			popularityCheckbox, 
			);
		setQuestionsData(data.docs.map((doc) => doc.data()));
		// console.log(
		// 	data.docs.map((doc) => doc.data())
		// );
	};

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
						questionsData.map((question) => (
							<div>
								<ListItem>
									<ListItemIcon>
										<IconButton>
											<AddIcon />
										</IconButton>
									</ListItemIcon>
									<div>

									<ListItemText 
										primary={question.question}
										secondary={[
											"Subject: " + question.subject, 
											"Type: " + question.type, 
											"Experience: " + 
											question.experienceLevel].join(" | ")}
										/>
										<ListItemText secondary={"Popularity: " + question.popularity}/>
									</div>
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
							<Checkbox id='popularity-check-box' 
								checked={popularityCheckbox}
								onChange={handlePopularityChange}
							></Checkbox>
						</div>
						<label htmlFor='subject-select'>Subject</label>
						<Select
							id='subject-select'
							value={subjectSelect}
							onChange={handleSubjectChange}
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
							value={typeSelect}
							onChange={handleTypeChange}
						>
							<MenuItem value='Any'>Any</MenuItem>
							<MenuItem value='Technical'>Technical</MenuItem>
							<MenuItem value='Behavioral'>Behavioral</MenuItem>
						</Select>
						<label htmlFor='experience-level-select'>Experience Level</label>
						<Select
							id='experience-level-select'
							value={experienceLevelSelect}
							onChange={handleExperienceLevelChange}
						>
							<MenuItem value='Any'>Any</MenuItem>
							<MenuItem value='Entry'>Entry</MenuItem>
							<MenuItem value='Mid'>Mid</MenuItem>
							<MenuItem value='Senior'>Senior</MenuItem>
						</Select>
						<Button variant='contained' onClick={handleFilterSubmit}>Apply Filters</Button>

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