import Image, { type StaticImageData } from "next/image";

type ProfileCardProps = {
  name?: string;
  title?: string;
  description?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  className?: string;
};

export default function ProfileCard({
  name,
  title,
  description,
  imageSrc,
  imageAlt,
  className = "",
}: ProfileCardProps) {
  return (
    <div className={`rounded-lg border border-foreground/10 bg-background p-4 ${className}`}>
      <div className="flex items-center gap-4">
        {imageSrc ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-foreground/10">
            <Image
              src={imageSrc}
              alt={imageAlt ?? name ?? ""}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full border border-foreground/10 bg-foreground/5" />
        )}

        <div>
          {name && <div className="text-sm font-semibold">{name}</div>}
          {title && <div className="text-xs text-foreground/70">{title}</div>}
        </div>
      </div>

      {description && <p className="mt-3 text-sm text-foreground/80">{description}</p>}
    </div>
  );
}
