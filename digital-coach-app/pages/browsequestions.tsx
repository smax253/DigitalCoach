import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import { useState, useEffect } from "react";

import QuestionService from "@App/lib/question/QuestionService";
import QuestionSetsService from "@App/lib/questionSets/QuestionSetsService";

import AddQuestionToSetModal from "@App/components/molecules/modals/AddQuestionToSetModal";

import styles from "@App/styles/BrowseQuestionsPage.module.scss";

import { List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, TextField, Box, Checkbox, Select, MenuItem, FormControl, SelectChangeEvent, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
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
];

function BrowseQuestionsPage() {
  const { currentUser } = useAuthContext();

  const [popularityCheckbox, setPopularityCheckbox] = useState(true);
  const [experienceLevelSelect, setExperienceLevelSelect] = useState("Any");
  const [subjectSelect, setSubjectSelect] = useState("Any");
  const [typeSelect, setTypeSelect] = useState("Any");
  const [searchText, setSearchText] = useState("");

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState<any>({});

  const [questionsData, setQuestionsData] = useState<any[]>([]);
  const [userQuestionSets, setUserQuestionSets] = useState<any[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      const questions: any[] = (await QuestionService.getByPopularityDesc()).docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setQuestionsData(questions);
    }
    async function fetchUserQuestionSets() {
      const userQuestionSets: any[] = (await QuestionSetsService.getQuestionSetByUserId(currentUser!.id)).docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setUserQuestionSets(userQuestionSets);
    }
    fetchQuestions();
    fetchUserQuestionSets();
  }, []);

  const handleFilterSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = await QuestionService.getByFilters(
      subjectSelect as TSubject,
      typeSelect as TQuestionType,
      experienceLevelSelect as TExperienceLevel,
      popularityCheckbox,
      searchText.toLowerCase().trim()
    );
    setQuestionsData(data.docs.map((doc) => doc.data()));
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleOpenAddQuestionModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (userQuestionSets.length === 0) {
      alert("You have no question sets to add questions to. Please create a question set first.");
      return;
    }
    setSelectedQuestion(event);
    setShowAddQuestionModal(true);
  };

  const handleAddQuestionToSet = async (questionId: string, questionSetId: string) => {
    await QuestionSetsService.addQuestionToSet(questionId, questionSetId);
  };

  return (
    <div className={styles.BrowseQuestionsPage}>
      <h1>Browse Questions</h1>
      <Box
        sx={{
          maxWidth: "80%",
          display: "flex",
          flexDirection: "row",
          verticalAlign: "top",
          mt: 2,
        }}
      >
        <List sx={{ bgcolor: "background.paper" }}>
          {questionsData.map((question) => (
            <div>
              <ListItem>
                <ListItemIcon>
                  <IconButton onClick={() => handleOpenAddQuestionModal(question)}>
                    <AddIcon />
                  </IconButton>
                </ListItemIcon>
                <div>
                  <ListItemText primary={question.question} secondary={["Subject: " + question.subject, "Type: " + question.type, "Experience: " + question.experienceLevel].join(" | ")} />
                  <ListItemText secondary={"Popularity: " + question.popularity} />
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>

        <Box
          id="#filters"
          sx={{
            maxWidth: "25%",
            height: "50%",
            display: "flex",
            minWidth: "20%",
            flexDirection: "column",
            verticalAlign: "top",
            mt: 2,
            ml: 4,
            border: "1px solid black",
            padding: 4,
          }}
        >
          <h2>Filters</h2>

          <FormControl size="small">
            <div>
              <label htmlFor="popularity-check-box">Sort By Popularity</label>
              <Checkbox id="popularity-check-box" checked={popularityCheckbox} onChange={(event) => setPopularityCheckbox(event.target.checked)}></Checkbox>
            </div>
            <TextField variant="outlined" size="small" label="Question Keyword Search" onChange={handleTextFieldChange}></TextField>
            <label htmlFor="subject-select">Subject</label>
            <Select id="subject-select" value={subjectSelect} onChange={(event) => setSubjectSelect(event.target.value)}>
              <MenuItem value="Any">Any</MenuItem>
              {sampleSubjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
            <label htmlFor="type-select">Type</label>
            <Select id="type-select" value={typeSelect} onChange={(event) => setTypeSelect(event.target.value)}>
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Behavioral">Behavioral</MenuItem>
            </Select>
            <label htmlFor="experience-level-select">Experience Level</label>
            <Select id="experience-level-select" value={experienceLevelSelect} onChange={(event) => setExperienceLevelSelect(event.target.value)}>
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="Entry">Entry</MenuItem>
              <MenuItem value="Mid">Mid</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
            <Button sx={{ mt: 1 }} variant="contained" onClick={handleFilterSubmit}>
              Apply Filters
            </Button>
          </FormControl>
        </Box>
      </Box>
      {showAddQuestionModal && userQuestionSets && questionsData && (
        <AddQuestionToSetModal
          isOpen={showAddQuestionModal}
          handleClose={() => setShowAddQuestionModal(false)}
          handleAdd={handleAddQuestionToSet}
          modal="addModal"
          questionSets={userQuestionSets}
          question={selectedQuestion}
        />
      )}
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
