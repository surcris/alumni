import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InternDto } from 'src/dtos/intern.dto';
import { Model } from 'mongoose';
import { UpdateInternDto } from 'src/dtos/update-intern.dto';
import { InterfaceIntern } from 'src/interfaces/intern.interface';
import { Crud } from 'src/interfaces/crud.interface';

@Injectable()
export class InternService implements Crud {
  constructor(
    @InjectModel('Intern') private internModel: Model<InterfaceIntern>,
  ) {}

  async findAll(): Promise<InterfaceIntern[]> {
    const internData = await this.internModel.find().sort({ lastname: 1 });
    if (!internData || internData.length == 0) {
      throw new NotFoundException('Interns data not found!');
    }
    return internData;
  }
  async findOne(id: string): Promise<InterfaceIntern> {
    Logger.log(' ID user ' + id);
    const existingIntern = await this.internModel
      .findOne({
        $or: [{ _id: id }, { userId: Number(id) }],
      })
      .exec();
    Logger.log(JSON.stringify(existingIntern));
    if (!existingIntern) {
      throw new NotFoundException(`Intern #${id} not found`);
    }
    return existingIntern;
  }

  add(intern: InternDto): Promise<InterfaceIntern> {
    const newIntern = new this.internModel(intern);
    return newIntern.save();
  }

  async update(internId: string, updateInternDto: UpdateInternDto) {
    const existingIntern = await this.internModel.findByIdAndUpdate(
      internId,
      updateInternDto,
    );
    if (!existingIntern) {
      throw new NotFoundException(`Intern #${internId} not found`);
    }
    return `Intern #${internId} updated`;
  }

  async delete(internId: string): Promise<string> {
    const deletedIntern = await this.internModel.findByIdAndDelete(internId);
    if (!deletedIntern) {
      throw new NotFoundException(`Intern #${internId} not found`);
    }
    return `Intern #${internId} deleted`;
  }

  async getProfileData(userId: string): Promise<InterfaceIntern> {
    const userIdNumber = Number(userId);
    const existingIntern = await this.internModel
      .findOne({ userId: userIdNumber })
      .exec();
    if (!existingIntern) {
      throw new NotFoundException(`Intern #${userId} not found`);
    }
    return existingIntern;
  }
}
