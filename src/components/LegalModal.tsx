import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@/components/ui/icon"
import { Cancel01Icon, CookieIcon, MapsIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

export type LegalModalType = "terms" | "privacy" | "cookies" | "sitemap" | null

interface LegalModalProps {
  type: LegalModalType
  onClose: () => void
  onNavigate?: (page: "home" | "catalog" | "services" | "about") => void
}

export default function LegalModal({ type, onClose, onNavigate }: LegalModalProps) {
  if (!type) return null

  const getModalTitle = () => {
    switch (type) {
      case "terms":
        return "Syarat & Ketentuan (Terms & Conditions)"
      case "privacy":
        return "Kebijakan Privasi (Privacy Policy)"
      case "cookies":
        return "Kebijakan Cookie (Cookie Policy)"
      case "sitemap":
        return "Peta Situs (Sitemap)"
      default:
        return ""
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2.5">
            <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px] font-bold tracking-wider">
              Puncak Drive Official
            </Badge>
            <h3 className="text-lg font-bold text-foreground">
              {getModalTitle()}
            </h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground">
            <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
          </Button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-muted-foreground leading-relaxed flex-1">
          
          {type === "terms" && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-foreground space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4" />
                  <span>Ketentuan Umum Sewa Kendaraan</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Dengan menggunakan layanan Puncak Drive, Anda menyetujui seluruh ketentuan operasional demi keselamatan dan kenyamanan perjalanan.
                </p>
              </div>

              <div className="space-y-3 text-foreground font-medium">
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">1. Ketentuan Pengemudi (Driver Only)</h4>
                <p className="text-xs text-muted-foreground">
                  Seluruh armada Puncak Drive untuk rute kawasan Puncak, Bogor, dan sekitarnya wajib didampingi oleh Driver profesional Puncak Drive guna menjamin keselamatan rute pegunungan. Layanan lepas kunci hanya berlaku bagi mitra korporat resmi dengan verifikasi dokumen penuh.
                </p>

                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">2. Persyaratan Dokumen</h4>
                <p className="text-xs text-muted-foreground">
                  Penyewa wajib melampirkan identitas resmi (E-KTP / Paspor) serta kontak darurat yang aktif sebelum keberangkatan.
                </p>

                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">3. Pemesanan & Pembatalan</h4>
                <p className="text-xs text-muted-foreground">
                  Pemesanan dianggap konfirmasi setelah mendapat konfirmasi resmi dari Admin WhatsApp Puncak Drive. Pembatalan H-1 dapat dilakukan tanpa denda.
                </p>
              </div>
            </div>
          )}

          {type === "privacy" && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-foreground space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4" />
                  <span>Perlindungan Data Pribadi</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Puncak Drive berkomitmen penuh menjaga kerahasiaan dan keamanan informasi pribadi seluruh pelanggan.
                </p>
              </div>

              <div className="space-y-3 text-foreground font-medium">
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">1. Pengumpulan Informasi</h4>
                <p className="text-xs text-muted-foreground">
                  Kami mengumpulkan data seperti Nama, Nomor WhatsApp, Tanggal Sewa, dan Lokasi Penjemputan semata-mata untuk keperluan pemrosesan reservasi rental mobil.
                </p>

                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">2. Penggunaan Data</h4>
                <p className="text-xs text-muted-foreground">
                  Data Anda tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga di luar keperluan koordinasi penjemputan driver resmi kami.
                </p>
              </div>
            </div>
          )}

          {type === "cookies" && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-foreground space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <HugeiconsIcon icon={CookieIcon} className="w-4 h-4" />
                  <span>Penggunaan Cookie Browser</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Situs web kami menggunakan cookie ringan untuk memberikan pengalaman navigasi yang lebih cepat dan responsif.
                </p>
              </div>

              <div className="space-y-3 text-foreground font-medium">
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">1. Preferensi Bahasa (i18n)</h4>
                <p className="text-xs text-muted-foreground">
                  Cookie menyimpan pilihan bahasa Anda (Indonesia, English, atau Arabic) agar tersimpan secara otomatis saat Anda kembali berkunjung.
                </p>

                <h4 className="font-bold text-sm uppercase tracking-wide text-primary">2. Performa & Analitik</h4>
                <p className="text-xs text-muted-foreground">
                  Kami tidak menyimpan cookie pelacak iklan mengganggu. Semua cookie bersifat opsional dan dapat dibersihkan kapan saja melalui pengaturan browser Anda.
                </p>
              </div>
            </div>
          )}

          {type === "sitemap" && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-foreground space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <HugeiconsIcon icon={MapsIcon} className="w-4 h-4" />
                  <span>Peta Situs Puncak Drive (Sitemap)</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Struktur navigasi halaman resmi Puncak Drive Car Rental.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground">
                <button
                  onClick={() => { onNavigate?.("home"); onClose(); }}
                  className="p-3 bg-muted/40 hover:bg-accent rounded-xl border border-border text-left transition-colors flex items-center gap-2 font-bold text-xs"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>Beranda (Home Page)</span>
                </button>

                <a
                  href="#catalog"
                  onClick={() => { onNavigate?.("home"); onClose(); }}
                  className="p-3 bg-muted/40 hover:bg-accent rounded-xl border border-border text-left transition-colors flex items-center gap-2 font-bold text-xs"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>Katalog Armada (Car Catalog)</span>
                </a>

                <a
                  href="#services"
                  onClick={() => { onNavigate?.("home"); onClose(); }}
                  className="p-3 bg-muted/40 hover:bg-accent rounded-xl border border-border text-left transition-colors flex items-center gap-2 font-bold text-xs"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>Layanan Rental (Our Services)</span>
                </a>

                <button
                  onClick={() => { onNavigate?.("about"); onClose(); }}
                  className="p-3 bg-muted/40 hover:bg-accent rounded-xl border border-border text-left transition-colors flex items-center gap-2 font-bold text-xs"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>Tentang Kami (Company Profile)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
          <Button onClick={onClose} size="sm" className="rounded-xl text-xs font-bold px-6">
            Tutup (Close)
          </Button>
        </div>

      </div>
    </div>
  )
}
