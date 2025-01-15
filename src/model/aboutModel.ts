import mongoose,{Schema,Document} from "mongoose";
interface IAbout extends Document {
    title: string;
    description: string;
    subDescription: string;
    image: string;
    link: string;
    status:string;
    createdAt?: Date;
    updatedAt?: Date;
}
const aboutSchema = new Schema<IAbout>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subDescription: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
})
export default mongoose.model<IAbout>("About", aboutSchema);