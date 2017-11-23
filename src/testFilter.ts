import { Filter } from 'oda-api-graphql';

const dataset = {
  'User': [
    {
      'userName': 'system',
      'password': '123456',
      'isAdmin': true,
      'isSystem': true,
      'enabled': true,
      'id': 1,
    },
    {
      'userName': 'Mister',
      'password': '123123123',
      'isAdmin': false,
      'isSystem': false,
      'enabled': true,
      'id': 3,
    },
    {
      'userName': 'admin',
      'password': '12345',
      'isAdmin': true,
      'enabled': true,
      'id': 2,
      'asTeacherValues':
        {
          'asTeacherType': 'CREATE',
          'firstName': 'Admin',
          'middleName': 'i',
          'lastName': 'Super',
        },
      'asTeacher': null,
      'asStudentValues': [
        {
          'asStudentType': 'CREATE',
          'firstName': 'Peter',
          'middleName': 'b',
          'lastName': 'Brosnon',
          'uin': '007',
          'dateOfBirth': '2017-10-31T21:00:00.000Z',
        },
      ],
      'asStudent': null,
    },
  ],
  'Student': [
    {
      'firstName': 'Name',
      'middleName': 'Second',
      'lastName': 'Last',
      'uin': '0001',
      'dateOfBirth': '2017-11-14T21:00:00.000Z',
      'followingsIds': [
        1,
      ],
      'id': 1,
      'groupId': 1,
      'followersIds': [
        1,
      ],
    },
  ],
  'Teacher': [
    {
      'firstName': 'First ',
      'middleName': 'Name',
      'lastName': 'Teacher',
      'id': 1,
      'subjectsIds': [
        1,
      ],
    },
  ],
  'Subject': [
    {
      'name': 'Subject',
      'id': 1,
    },
    {
      'name': 'new Subject',
      'groupsIds': [
        1,
      ],
      'teacherId': 1,
      'id': 2,
    },
  ],
  'StudentProfile': [
    {
      'studentId': 1,
      'maths': 1,
      'physics': 1,
      'language': 1,
      'id': 1,
    },
  ],
  'StudentsGroup': [
    {
      'name': 'First One',
      'subjectsIds': [
        1,
      ],
      'studentsIds': [
        1,
      ],
      'id': 1,
    },
  ],
  'Following': [],
  'StudentsGroupSubject': [],
};

const f = Filter.Process.create(
  {
    and: [
      { isAdmin: { eq: true } },
      { userName: { imatch: 'sys' } },
      { asTeacherValues: { exists: true } }
    ],
  });
console.log(f.toString());

let dir = dataset.User.filter(f);

console.log(dir);
