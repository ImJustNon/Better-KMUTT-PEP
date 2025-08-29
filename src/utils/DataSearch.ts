export type PepSpecs = {
    index: string;
    subjectCode: string;
    subjectName: string;
    link: string | null;
    callNumber: string;
    year: string;
    semester: string;
    examType: string;
}

export default class DataSearch {
    private data: PepSpecs[] = [];

    constructor(data: PepSpecs[]){
        this.data = data;
    }

    public getAllYears(): string[]{
        const mapAllYears = this.data.map(d => d.year);
        return [...new Set(mapAllYears)];
    }

    public getAllSubjectsName(): string[]{
        const mapAllSubjects = this.data.map(d => d.subjectName);
        return [...new Set(mapAllSubjects)];
    }

    public getAllSubjectCodes(): string[]{
        const mapAllSubjectCodes = this.data.map(d => d.subjectCode);
        return [...new Set(mapAllSubjectCodes)];
    }

    public getAllSemesters(): string[]{
        const mapAllSemesters = this.data.map(d => d.semester);
        return [...new Set(mapAllSemesters)];
    }

    public getAllExamTypes(): string[]{
        const mapAllExamTypes = this.data.map(d => d.examType);
        return [...new Set(mapAllExamTypes)];
    }

    public getAllCallNumbers(): string[]{
        const mapAllCallNumbers = this.data.map(d => d.callNumber);
        return [...new Set(mapAllCallNumbers)];
    }

    public getAllLinks(): any[]{
        const mapAllLinks = this.data.map(d => d.link);
        return mapAllLinks;
    }

    public search(query: string | null, year: string | null, semester: string | null, examType: string | null): PepSpecs[] {
        
        // idk how did it actualy works but it works well LOL
        return this.data.filter(d => {
            return (query ? d.subjectName.includes(query) : true) &&
                   (year ? d.year === year : true) &&
                   (semester ? d.semester === semester : true) &&
                   (examType ? d.examType === examType : true);
        });
    }

    public getByOffset(offset: number): PepSpecs[] {
        const sortData = this.data.sort((a, b) => parseInt(a.index) - parseInt(b.index));
        return sortData.slice(offset * 10, (offset * 10) + 10);
    }

}