import { PublicService } from './public.service';
export declare class PublicController {
    private readonly publicService;
    constructor(publicService: PublicService);
    getLanding(): Promise<{
        slug: string;
        title: string;
    }>;
    getTeamMembers(group: 'board' | 'management' | undefined): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        role: string | null;
        siteId: string;
        title: string;
        image: string | null;
        order: number;
        group: string;
        credentials: string | null;
        linkedIn: string | null;
        bio: string | null;
        category: string | null;
    }[]>;
    getEvents(status: 'upcoming' | 'past' | undefined): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        title: string;
        description: string;
        order: number;
        status: string;
        date: string;
        time: string | null;
        location: string;
        attendees: string | null;
        paragraphs: import("@prisma/client/runtime/library").JsonValue;
        highlights: import("@prisma/client/runtime/library").JsonValue;
        images: import("@prisma/client/runtime/library").JsonValue;
        contacts: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getEvent(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteId: string;
        title: string;
        description: string;
        order: number;
        status: string;
        date: string;
        time: string | null;
        location: string;
        attendees: string | null;
        paragraphs: import("@prisma/client/runtime/library").JsonValue;
        highlights: import("@prisma/client/runtime/library").JsonValue;
        images: import("@prisma/client/runtime/library").JsonValue;
        contacts: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getStories(group: string | undefined): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        story: string | null;
        role: string | null;
        siteId: string;
        image: string | null;
        order: number;
        group: string;
        summary: string | null;
        intro: string | null;
        sections: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getPage(slug: string): Promise<{
        slug: string;
        title: string;
        description: string | null;
        html: import("../../common/collection-expansion").PageElement[];
        metadata: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
