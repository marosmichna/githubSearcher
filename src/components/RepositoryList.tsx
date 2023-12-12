import { useState, useEffect } from 'react';
import { repositoryData as repositoryDataModel } from '../models/repositoryData';
import axios from 'axios';

interface RepositoryListProps {
    userSelection: string;
    onRepositoryClick: (repositoryRow: string) => void;
}

const RepositoryList = ({ userSelection, onRepositoryClick }: RepositoryListProps) => {

    const [repositoriesData, setRepositoriesData] = useState<repositoryDataModel[]>([]);
    const [visibleRepositoriesData, setVisibleRepositoriesData] = useState(10);

    useEffect(() => {
        const fetchRepositoriesData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${userSelection}/repos`);
                setRepositoriesData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRepositoriesData();
        setVisibleRepositoriesData(10);
    }, [userSelection]);

    const showMoreRepositories = () => {
        setVisibleRepositoriesData((perVisibleRepositoriesData) => perVisibleRepositoriesData + 10);
    }

    const handleRepositoryRowCLick = (repositoryRow: string) => {
        onRepositoryClick(repositoryRow);
    }

    return (
        <div className="repository-container">
            {userSelection && <h2>{userSelection}</h2>}
            <ul>
                {
                    repositoriesData.slice(0, visibleRepositoriesData).map((repositorieData) => (
                        <li 
                            key={repositorieData.id}
                            onClick={() => handleRepositoryRowCLick(repositorieData.name)}
                            className="repository-data"
                        >       
                            {repositorieData.name}/{repositorieData.description}
                        </li>
                    ))
                }
                {
                    repositoriesData.length > visibleRepositoriesData && (
                        <button 
                            onClick={showMoreRepositories}
                            className="repository-btn"
                        >
                            Show More
                        </button>
                    )
                }
            </ul>
        </div>
    )
}

export default RepositoryList;
