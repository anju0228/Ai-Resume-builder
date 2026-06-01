import e from "express";
import { image, title } from "framer-motion/client";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
    default: "My Resume"
  },
  public: {
    type: Boolean,
    default: false  
    },
    template: {
      type: String,
      default: "template1"
    },
    accent_color: {
      type: String,
      default: "#000000"    
    },
    professional_summary: {
      type: String,
      default: ""   
    },
    skills: {
        type: [String],
        default: []
    },
    personal_info: {
        image: {
            type: String,
            default: "" 
        },
        name: {
            type: String,
            default: ""
        },
        profession: {
            type: String,
            default: "" 
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        github: {
            type: String,   
            default: ""
        }
    },
    experience: [
        {
            company: {
                type: String,
                default: ""
            },
            position: {
                type: String,
                default: ""
            },
            start_date: {
                type: String,
                default: ""
            },
            end_date: {
                type: String,
                default: ""            },
            description: {
                type: String,
                default: ""            }  ,
                is_current: {
                    type: Boolean,
                    default: false
                },

        }
    ],
    project: [
        {
            name: { 
                type: String,
                default: ""
            },
            description: {
                type: String,
                default: ""            },
            link: {
                type: String,
                default: ""            }}
            ],
            education: [
                {
                    institution: {  
                        type: String,
                        default: ""                    },
                    degree: {
                        type: String,   
                        default: ""                    },
                    start_date: {
                        type: String,
                        default: ""                    },
                    end_date: {
                        type: String,
                        default: ""                    },
                    description: {
                        type: String,
                        default: ""                    }

    }]

  // Add other resume fields as needed
} ,{ timestamps: true ,minimize: false });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;