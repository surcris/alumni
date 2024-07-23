import { CompanyType } from "../company/company-type"
import { PoeType } from "../poe/poe-type"

export type InternType = {
    id?: number
    lastname: string
    firstname: string
    occupation?: string
    company: CompanyType
    poe: PoeType
}