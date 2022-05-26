import {} from 'sequelize'

export default interface PersonalOut {
    id: number;
    email: string;
    password: string;
    score: number | null
}

// export default interface PersonalOuput extends Required<Personal>{}
