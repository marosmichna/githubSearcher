
import { useState } from "react";
import UserInputForm from "./components/UserInputForm"
import RepositoryList from "./components/RepositoryList";
import CommitList from "./components/CommitList";
import Header from "./components/Header";

function App() {

  const [selectedUserSlelection, setSelectedUserSelection] = useState<string | null>(null);
  const [selectedRepositoryRow, setSelectedRepositoryRow] = useState<string | null>(null);

  const handleFormSubmit = (userSelection: string) => {
    setSelectedUserSelection(userSelection);
    setSelectedRepositoryRow(null);
  };

  const handleSelectedRepositoryRow = (repositoryRow: string) => {
    setSelectedRepositoryRow(repositoryRow);
  }

  return (
    <div className="app-container">
      <UserInputForm onSubmit={handleFormSubmit} />
      {
        selectedUserSlelection && <Header />
      }
      {
        selectedUserSlelection && <RepositoryList userSelection={selectedUserSlelection} onRepositoryClick={handleSelectedRepositoryRow} />
      }
      {
        selectedRepositoryRow && <CommitList userSelection={selectedUserSlelection} repositoryRow={selectedRepositoryRow} />
      }
    </div>
  )
}

export default App
