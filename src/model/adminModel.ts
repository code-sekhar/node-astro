import mongoose,{Schema,Document} from "mongoose";
import bcrypt from 'bcryptjs';
interface IAdmin extends Document {
        name: string;
        email: string;
        password: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        createdAt?: Date;
        updatedAt?: Date;
    }
    
    const adminSchema = new Schema<IAdmin>({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },{
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    });
    //Hash password before saving to database
    adminSchema.pre<IAdmin>("save", async function (next) {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    })
    export default mongoose.model<IAdmin>("Admin", adminSchema);