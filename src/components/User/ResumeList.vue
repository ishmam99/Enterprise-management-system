<template>
  <div class="p-4">
 <div v-if="selectedResume">
  <div class="bg-white rounded-xl shadow-lg p-4 mb-4">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold">{{ selectedResume.title }}</h2>

      <div class="flex gap-2">
        <button
          @click="selectedResume = null; pdfPreviewUrl = null"
          class="text-sm text-red-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>

    <iframe
      v-if="pdfPreviewUrl"
      :src="pdfPreviewUrl"
      class="w-full h-[700px] border rounded-lg"
    ></iframe>
  </div>
</div>

    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Saved Resumes</h2>
      </div>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="animate-pulse bg-white rounded-xl shadow p-4">
          <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else class="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <table class="w-full text-sm text-left table-zebra">
          <thead class="bg-blue-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 border-e py-3">#</th>
              <th class="px-4 border-e py-3">Resume Title</th>
              <th class="px-4 border-e py-3">Created Date</th>
              <th class="px-4 border-e py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y">
            <tr v-for="(item, index) in resumes" :key="item.id" class="hover:bg-blue-50/30 transition">
              <td class="px-4 border-e py-4 text-gray-400">{{ index + 1 }}</td>
              <td class="px-4 border-e py-4 font-semibold text-gray-800">{{ item.title }}</td>
              <td class="px-4 border-e py-4 text-gray-600">
                {{ moment(item.created_at).format('MMM D, YYYY') }}
              </td>
              <td class="px-4 border-e py-4 text-center space-x-2">
                <button class="px-4 py-1.5 text-xs font-bold bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition" @click="previewPDF(item)">
                  View Full CV
                </button>
                <button class="px-4 py-1.5 text-xs font-bold bg-red-800 text-white rounded-lg hover:bg-black transition" @click="deleteResume(item)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'
import moment from 'moment'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const pdfPreviewUrl = ref(null)
const loading = ref(true)
const resumes = ref([])
const selectedResume = ref(null) // Controls formal view toggle

const fetchResumes = async () => {
  loading.value = true
  try {
    // Standardizing the response data
    const response = await api().get('/user-resumes')
    resumes.value = response.data.data
  } catch (err) {
    console.error("Fetch failed, using mock data")
    // Fallback using your exact provided JSON structure
    resumes.value = [
      {
        id: 2,
        title: "Software Development CV",
        resume: {
          professional_summary: {
            summary: "Results-driven Stress Analyst...",
            experience_in_years: "24",
            project_completed: "45",
            skills: ["Finite Element Analysis (FEA)", "Linear & Nonlinear Structural Analysis"]
          },
          work_experiences: [
            { id: "2", company_name: "Bell Textron", position: "Senior Stress Analyst", start_date: "2019-01-10", is_current: "1", responsibilities: "Performed linear and nonlinear FEA...", location: "USA" }
          ],
          education: [
            { id: "5", institute_name: "Dhaka University", field_of_study: "Computer Science", start_year: "2018", end_year: "2022" }
          ],
          professional_references: [
            { user: { name: "User_Bell_0001" } }
          ]
        }
      }
    ]
  } finally {
    loading.value = false
  }
}

/* ---------------- ACTIONS ---------------- */

const deleteResume = async (item) => {
  // 1. Ask for confirmation using SweetAlert2
  const result = await Swal.fire({
    title: 'Delete Resume?',
    text: `Are you sure you want to delete "${item.title}"? This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626', // Red color for delete
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
    reverseButtons: true
  })

  // 2. If user cancels, stop here
  if (!result.isConfirmed) return

  try {
    // 3. Show a "Deleting..." loading state
    Swal.fire({
      title: 'Deleting...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() }
    })

    // 4. Perform the actual API call
    // Your JSON shows the ID is 'item.id' (e.g., 2)
    await api().delete(`/user-resumes/${item.id}`)

    // 5. Update local state to remove the item from the UI immediately
    resumes.value = resumes.value.filter(r => r.id !== item.id)

    // 6. Success notification
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Your resume has been removed.',
      timer: 1500,
      showConfirmButton: false
    })

  } catch (err) {
    console.error("Delete failed:", err)

    // 7. Error notification if the server fails
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while deleting. Please try again.',
    })
  }
}
const previewPDF = (resumeItem) => {
  selectedResume.value = resumeItem

  if (pdfPreviewUrl.value) {
    URL.revokeObjectURL(pdfPreviewUrl.value)
  }

  const doc = generatePDF(resumeItem)
  const blob = doc.output('blob')
  pdfPreviewUrl.value = URL.createObjectURL(blob)
}
const generatePDF = (item) => {
  const data = item.resume
  const doc = new jsPDF()

  let yPos = 20
  const margin = 20
  const pageHeight = 280

  const checkPage = (currentY, needed = 10) => {
    if (currentY + needed > pageHeight) {
      doc.addPage()
      return 20
    }
    return currentY
  }

// HEADER
doc.setFillColor(37, 99, 235)
doc.rect(0, 0, 210, 45, 'F')

// Name
doc.setTextColor(255, 255, 255)
doc.setFontSize(20)
doc.setFont('helvetica', 'bold')
doc.text(authStore?.user?.name || 'Your Name', margin, 20)

// Email
doc.setFontSize(11)
doc.setFont('helvetica', 'normal')
doc.text(
  `Email: ${authStore?.user?.email || 'your@email.com'}`,
  margin,
  28
)

// Optional Phone (from resume references or skip)
if (data?.professional_references?.[0]?.phone) {
  doc.text(
    `Phone: ${data.professional_references[0].phone}`,
    margin,
    34
  )
}

// Resume Title (small, right aligned)
doc.setFontSize(10)


yPos = 55
doc.setTextColor(0, 0, 0)

  yPos = 55
  doc.setTextColor(0, 0, 0)

  const sectionTitle = (title) => {
    yPos = checkPage(yPos, 15)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(37, 99, 235)
    doc.text(title, margin, yPos)
    yPos += 6

    doc.setDrawColor(200)
    doc.line(margin, yPos, 190, yPos)
    yPos += 6
  }

  // SUMMARY
  if (data.professional_summary?.summary) {
    sectionTitle('Professional Summary')

    const text = doc.splitTextToSize(data.professional_summary.summary, 170)
    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    doc.text(text, margin, yPos)
    yPos += text.length * 5 + 6
  }

  // EXPERIENCE
  if (data.work_experiences?.length) {
    sectionTitle('Work Experience')

    data.work_experiences.forEach((exp) => {
      yPos = checkPage(yPos, 20)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(exp.position || '', margin, yPos)

      doc.setFontSize(10)
      doc.setTextColor(37, 99, 235)
      doc.text(exp.company_name || '', margin, yPos + 5)

      doc.setFontSize(9)
      doc.setTextColor(107, 114, 128)
      doc.text(
        `${exp.start_date} - ${exp.is_current === '1' ? 'Present' : exp.end_date}`,
        190,
        yPos,
        { align: 'right' }
      )

      yPos += 10

      const resp = doc.splitTextToSize(exp.responsibilities || '', 170)
      doc.setTextColor(75, 85, 99)
      doc.text(resp, margin, yPos)
      yPos += resp.length * 5 + 6
    })
  }

  // EDUCATION
  if (data.education?.length) {
    sectionTitle('Education')

    data.education.forEach((edu) => {
      yPos = checkPage(yPos, 15)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(edu.field_of_study || '', margin, yPos)

      doc.setFontSize(10)
      doc.setTextColor(75, 85, 99)
      doc.text(edu.institute_name || '', margin, yPos + 5)

      doc.setFontSize(9)
      doc.setTextColor(107, 114, 128)
      doc.text(`${edu.start_year} - ${edu.end_year}`, 190, yPos, {
        align: 'right'
      })

      yPos += 12
    })
  }

  // SKILLS
  if (data.professional_summary?.skills?.length) {
    sectionTitle('Skills')

    const skills = data.professional_summary.skills.join(', ')
    const split = doc.splitTextToSize(skills, 170)

    doc.setFontSize(10)
    doc.setTextColor(55, 65, 81)
    doc.text(split, margin, yPos)
    yPos += split.length * 5 + 6
  }

  // GENERAL SKILLS
  if (data.general_skills?.length) {
    sectionTitle('General Skills')

    autoTable(doc, {
      startY: yPos,
      head: [['Skill', 'Competencies', 'Level']],
      body: data.general_skills.map((s) => [
        s.name,
        s.competencies?.join(', ') || '-',
        s.proficiency_level || '-'
      ]),
    })

    yPos = doc.lastAutoTable.finalY + 10
  }
  // SOFTWARE SKILLS
if (data.software_skills?.length) {
  sectionTitle('Software Skills')

  autoTable(doc, {
    startY: yPos,
    head: [['Software', 'Tools', 'Level']],
    body: data.software_skills.map((s) => [
      s.name || '-',
      s.solutions?.map(sol => sol.name).join(', ') || '-',
      s.pivot?.level || '-'
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [124, 58, 237], // Purple like your UI
      textColor: 255,
      fontStyle: 'bold',
    }
  })

  yPos = doc.lastAutoTable.finalY + 10
}
// PROFESSIONAL REFERENCES
if (data.professional_references?.length) {
  sectionTitle('Professional References')

  data.professional_references.forEach((ref) => {
    yPos = checkPage(yPos, 20)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(ref.name || '', margin, yPos)

    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    doc.text(`${ref.designation} - ${ref.company_name}`, margin, yPos + 5)

    doc.setFontSize(9)
    doc.text(`Email: ${ref.email}`, margin, yPos + 10)
    doc.text(`Phone: ${ref.phone}`, margin, yPos + 15)

    yPos += 20
  })
}
  return doc
}
onMounted(fetchResumes)
</script>
