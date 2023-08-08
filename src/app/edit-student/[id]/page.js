'use client';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function EditStudent() {
  const params = useParams();
  const [student, setStudent] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    age: '',
    class: '',
    contact: '',
    district: '',
    email: '',
    group: '',
    certificate: '',
    certificatePath: '',
    cv: '',
    cvPath: '',
    noteFile: '',
    noteFilePath: '',
    voterId: '',
    voterIdPath: '',
    image: '',
    imagePath: '',
  });
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`https://localhost:7180/api/Student/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setStudent(data));
      setLoading(false);
    }
  }, [session, loading]);

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append(
        'firstName',
        data.firstName ? data.firstName : student.firstName
      );
      formData.append(
        'lastName',
        data.lastName ? data.lastName : student.lastName
      );
      formData.append('about', data.about ? data.about : student.about);
      formData.append('age', data.age ? data.age : student.age);
      formData.append('class', data.class ? data.class : student.class);
      formData.append('contact', data.contact ? data.contact : student.contact);
      formData.append(
        'district',
        data.district ? data.district : student.district
      );
      formData.append('email', data.email ? data.email : student.email);
      formData.append('group', data.group ? data.group : student.group);
      formData.append(
        'certificate',
        data.certificate ? data.certificate : student.certificate
      );
      formData.append('certificatePath', student.certificatePath);
      formData.append('image', data.image ? data.image : student.image);
      formData.append('imagePath', student.imagePath);
      formData.append('cv', data.cv ? data.cv : student.cv);
      formData.append('cvPath', student.cvPath);
      formData.append(
        'noteFile',
        data.noteFile ? data.noteFile : student.noteFile
      );
      formData.append('noteFilePath', student.noteFilePath);
      formData.append('voterId', data.voterId ? data.voterId : student.voterId);
      formData.append('voterIdPath', student.voterIdPath);

      const rsp = await axios.put(
        `https://localhost:7180/api/Student/${student.id}`,
        formData,
        {
          'Content-Type':
            'multipart/form-data; boundary=<calculated when request is sent>',
          headers: {
            Authorization: 'Bearer ' + session?.user?.accessToken,
          },
        }
      );
      if (rsp.data.response === 'false') {
        toast.error(rsp.data.message);
      } else if (rsp.data.response === 'true') {
        toast.success(rsp.data.message);
        router.push('/');
      }
    } catch (error) {
      console.log('Student-info-update::Error: ', error);
      toast.error('Student-info update failed!');
    }
  };
  return (
    <main className=" min-h-screen container mx-auto">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg my-4">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Edit Student Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Profile</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="file"
                    onChange={(e) =>
                      setData({ ...data, image: e.target.files[0] })
                    }
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  First name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Last name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Class</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.class}
                    onChange={(e) =>
                      setData({ ...data, class: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Group</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.group}
                    onChange={(e) =>
                      setData({ ...data, group: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Age</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    defaultValue={student?.age}
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">About</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <textarea
                    rows={4}
                    name="description"
                    defaultValue={student?.about}
                    onChange={(e) =>
                      setData({ ...data, about: e.target.value })
                    }
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">District</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.district}
                    onChange={(e) =>
                      setData({ ...data, district: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Contact</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.contact}
                    onChange={(e) =>
                      setData({ ...data, contact: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    defaultValue={student?.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="block w-1/2 pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div>
                        <h4 className="pr-4">Note file : </h4>
                      </div>
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <input
                            type="file"
                            onChange={(e) =>
                              setData({ ...data, noteFile: e.target.files[0] })
                            }
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div>
                        <h4 className="pr-4">Voter id : </h4>
                      </div>
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <input
                            type="file"
                            onChange={(e) =>
                              setData({ ...data, voterId: e.target.files[0] })
                            }
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div>
                        <h4 className="pr-4">Certificate : </h4>
                      </div>
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <input
                            type="file"
                            onChange={(e) =>
                              setData({
                                ...data,
                                certificate: e.target.files[0],
                              })
                            }
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div>
                        <h4 className="pr-4">CV : </h4>
                      </div>
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <input
                            type="file"
                            onChange={(e) =>
                              setData({
                                ...data,
                                cv: e.target.files[0],
                              })
                            }
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <div className=" flex justify-start py-4 ml-5">
              <button
                onClick={() => handleUpdateProduct()}
                className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1.5 px-4 border border-green-500 hover:border-transparent rounded"
              >
                Update info
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
