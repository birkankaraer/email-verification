import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(username: string, email: string): Promise<User> {
    const verificationToken = crypto.randomBytes(16).toString('hex');
    const newUser = new this.userModel({
      username,
      email,
      verificationToken,
      isVerified: false,
    });

    await newUser.save();
    this.sendVerificationEmail(username, email, verificationToken);
    return newUser;
  }

  async verifyEmail(username: string, verificationToken: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return false;
    }

    if (user.verificationToken !== verificationToken) {
      return false;
    }

    user.isVerified = true;
    await user.save();
    return true;
  }

  async checkVerification(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return false;
    }

    return user.isVerified;
  }

  private async sendVerificationEmail(username: string, email: string, verificationToken: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Email Verification',
      text: `Hello ${username},\n\nPlease verify your email by clicking the following link: \nhttp://${'localhost'}:3000/user/verify-email/${username}/${verificationToken}\n\nThank You!\n`,
    };

    await transporter.sendMail(mailOptions);
  }
}
