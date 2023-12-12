import { useState, useEffect } from 'react';
import axios from "axios";
import { repositoryDataCommit as repositoryDataCommitModel } from '../models/repositoryData';

interface CommitListProps {
    userSelection: string | null;
    repositoryRow: string | null;
}

const CommitList = ({ userSelection, repositoryRow }: CommitListProps) => {

    const [commitData, setCommitData] = useState<repositoryDataCommitModel[]>([]);

    useEffect(() => {
        const fetchCommitData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/${userSelection}/${repositoryRow}/commits`);
                setCommitData(response.data.slice(0, 3)); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchCommitData();
    }, [userSelection, repositoryRow]);

    return (
        <div className="commit-container">
            {
                repositoryRow && <h2>{repositoryRow}</h2>
            }
            <ul>              
                {
                    commitData.map((commit) => (
                        <li 
                            key={commit.sha}
                            className="commit-data"
                        >
                            {commit.commit.message}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CommitList;
