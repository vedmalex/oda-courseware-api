export default {
  name: 'StudentAttendance',
  description: 'StudentAttendance',
  fields: {
    student: {
      indexed: true,
    },
    meeting: {
      indexed: true,
    },
    meetingLink: {
      indexed: true,
      relation: {
        belongsTo: 'meeting@Meeting#',
      },
    },
    studentLink: {
      indexed: true,
      relation: {
        belongsTo: 'student@Student#',
      },
    },
    present: {
      required: true,
      type: 'boolean',
    },
    specialNotes: {
      type: 'richText',
    },
  }
}
