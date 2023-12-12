export interface repositoryData {
    id: number,
    name: string,
    description: string,
}

export interface repositoryDataCommit {
    sha: string,
    commit: {
        message: string;
      },
}