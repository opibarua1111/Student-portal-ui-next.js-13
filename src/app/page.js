'use client';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [student, setStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.user?.email) {
      router.push('/login');
    }
  }, [!loading]);
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`https://localhost:7180/api/Student/${session.user.id}`, {
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
  }, [loading]);

  const handleDelete = async (id, name) => {
    var result = confirm(`Are you sure to delete this ${name}?`);
    if (result) {
      try {
        await fetch(
          `https://localhost:7180/api/Student/DeleteFile/${id}?DeleteFileName=${name}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + session?.user?.accessToken,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.response === 'false') {
              toast.error(data.message);
            } else if (data.response === 'true') {
              toast.success(data.message);
              setLoading(true);
            }
          });
      } catch (error) {
        console.log(`Delete-${name}::Error: `, error);
      }
      setLoading(true);
    }
  };
  const handleDeleteAccount = async (id) => {
    var result = confirm(`Are you sure to delete your account`);
    if (result) {
      try {
        await fetch(`https://localhost:7180/api/Student/DeleteAccount/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.user?.accessToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.response === 'false') {
              toast.error(data.message);
            } else if (data.response === 'true') {
              toast.success(data.message);
              setTimeout(() => {
                router.push('/register');
              }, 3000);
            }
          });
      } catch (error) {
        console.log('Delete-account::Error: ', error);
      }
      setLoading(true);
    }
  };
  return (
    <main className=" min-h-screen container mx-auto">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg my-4">
        <div className="px-4 py-6 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Student Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details.
            </p>
          </div>
          <div className=" flex justify-end py-4">
            <button
              onClick={() => router.push(`/edit-student/${student.id}`)}
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1.5 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Edit info
            </button>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Profile</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <img
                  src={`https://localhost:7180/${student.imagePath}`}
                  alt="Student image"
                  className=" object-cover object-center rounded-full w-28 h-28 group-hover:opacity-75 bg-gray-200"
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">First name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.firstName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Last name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.lastName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Class</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.class}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Group</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.group}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Age</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.age}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">About</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.about}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">District</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.district}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Contact</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.contact}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.email}
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
                        <span className="truncate font-medium">
                          {student.noteFilePath == null ? (
                            <h4>no file uploded</h4>
                          ) : (
                            <a
                              href={`https://localhost:7180/${student.noteFilePath}`}
                              target="_blank"
                              className="text-blue-600"
                            >
                              {student.noteFilePath}
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(student.id, 'notefile')}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
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
                        <span className="truncate font-medium">
                          {student.voterIdPath == null ? (
                            <h4>no file uploded</h4>
                          ) : (
                            <a
                              href={`https://localhost:7180/${student.voterIdPath}`}
                              target="_blank"
                              className="text-blue-600"
                            >
                              {student.voterIdPath}
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(student.id, 'voterid')}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
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
                        <span className="truncate font-medium">
                          {student.certificatePath == null ? (
                            <h4>no file uploded</h4>
                          ) : (
                            <a
                              href={`https://localhost:7180/${student.certificatePath}`}
                              target="_blank"
                              className="text-blue-600"
                            >
                              {student.certificatePath}
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(student.id, 'certificate')}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
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
                        <span className="truncate font-medium">
                          {student.cvPath == null ? (
                            <h4>no file uploded</h4>
                          ) : (
                            <a
                              href={`https://localhost:7180/${student.cvPath}`}
                              target="_blank"
                              className="text-blue-600"
                            >
                              {student.cvPath}
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(student.id, 'cv')}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                </ul>
                <div className=" flex justify-end py-4">
                  <button
                    onClick={() => handleDelete(student.id, 'all')}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1.5 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Delete all files
                  </button>
                </div>
                <div className=" flex justify-end py-4">
                  <button
                    onClick={() => handleDeleteAccount(student.id)}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1.5 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Delete account
                  </button>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
