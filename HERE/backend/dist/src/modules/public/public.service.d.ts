import { PrismaService } from "../../prisma/prisma.service";
export declare class PublicService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLandingPage(): Promise<{
        slug: string;
        title: string;
    }>;
    getPublicPage(slug: string): Promise<{
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
