import { PrismaService } from "../../prisma/prisma.service";
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toSlug;
    private uniqueSlug;
    private assertSiteOwner;
    findAll(siteId: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        published: boolean;
        slug: string;
        title: string;
        description: string | null;
        isLanding: boolean;
    }[]>;
    findOne(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    create(siteId: string, adminId: string, dto: CreatePageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    update(siteId: string, slug: string, adminId: string, dto: UpdatePageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    publish(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    unpublish(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    remove(siteId: string, slug: string, adminId: string): Promise<{
        message: string;
    }>;
    duplicate(siteId: string, slug: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
}
